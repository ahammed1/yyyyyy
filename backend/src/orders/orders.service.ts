import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OrderStatus, Prisma } from '@prisma/client';
import { createHmac, timingSafeEqual } from 'node:crypto';
import Razorpay from 'razorpay';
import { PrismaService } from '../prisma/prisma.service';
import { CheckoutDto, VerifyPaymentDto } from './orders.dto';

class InventoryShortageError extends Error {}

@Injectable()
export class OrdersService {
  private readonly razorpay: Razorpay | null;
  private readonly keyId?: string;
  private readonly keySecret?: string;

  constructor(
    private readonly prisma: PrismaService,
    config: ConfigService,
  ) {
    this.keyId = config.get<string>('RAZORPAY_KEY_ID');
    this.keySecret = config.get<string>('RAZORPAY_KEY_SECRET');
    this.razorpay = this.keyId && this.keySecret
      ? new Razorpay({ key_id: this.keyId, key_secret: this.keySecret })
      : null;
  }

  async checkout(userId: string, dto: CheckoutDto) {
    if (!this.razorpay || !this.keyId) {
      throw new ServiceUnavailableException(
        'Online checkout is not configured. Add Razorpay test credentials to the backend environment.',
      );
    }
    const address = this.validateAddress(dto.shippingAddress);
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } },
    });
    if (!cart?.items.length) throw new BadRequestException('Your cart is empty');

    const items = cart.items.map(({ product, quantity }) => {
      if (!product.active) throw new BadRequestException(`${product.name} is no longer available`);
      if (quantity > product.stock) {
        throw new BadRequestException(`Only ${product.stock} ${product.name} item(s) are in stock`);
      }
      return {
        productId: product.id,
        name: product.name,
        unitPrice: product.price,
        quantity,
      };
    });
    const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    if (!Number.isSafeInteger(total) || total < 1 || !Number.isSafeInteger(total * 100)) {
      throw new BadRequestException('The cart total is invalid');
    }

    const order = await this.prisma.order.create({
      data: {
        userId,
        status: 'PENDING',
        total,
        shippingAddress: address,
        items: { create: items },
      },
    });

    try {
      const paymentOrder = await this.razorpay.orders.create({
        amount: total * 100,
        currency: 'INR',
        receipt: order.id.slice(0, 40),
        notes: { orderId: order.id },
      });
      await this.prisma.order.update({
        where: { id: order.id },
        data: { razorpayOrderId: paymentOrder.id },
      });

      return {
        orderId: order.id,
        keyId: this.keyId,
        paymentOrderId: paymentOrder.id,
        amount: paymentOrder.amount,
        currency: paymentOrder.currency,
      };
    } catch (error) {
      await this.prisma.order.delete({ where: { id: order.id } });
      throw error;
    }
  }

  async verifyPayment(userId: string, dto: VerifyPaymentDto) {
    const razorpay = this.razorpay;
    if (!razorpay || !this.keySecret) {
      throw new ServiceUnavailableException('Razorpay is not configured');
    }
    const ownedOrder = await this.prisma.order.findFirst({
      where: {
        userId,
        razorpayOrderId: dto.razorpayOrderId,
        status: 'PENDING',
      },
    });
    if (!ownedOrder) throw new NotFoundException('Pending order not found');

    const expected = createHmac('sha256', this.keySecret)
      .update(`${dto.razorpayOrderId}|${dto.razorpayPaymentId}`)
      .digest();
    const received = Buffer.from(dto.razorpaySignature, 'hex');
    if (received.length !== expected.length || !timingSafeEqual(received, expected)) {
      throw new UnauthorizedException('Payment signature is invalid');
    }

    const payment = await razorpay.payments.fetch(dto.razorpayPaymentId);
    if (
      !payment ||
      payment.order_id !== dto.razorpayOrderId ||
      payment.amount !== ownedOrder.total * 100 ||
      payment.currency !== ownedOrder.currency ||
      payment.status !== 'captured'
    ) {
      throw new BadRequestException('Razorpay has not confirmed a captured payment for this order');
    }

    try {
      return await this.prisma.$transaction(async (tx) => {
        const claimed = await tx.order.updateMany({
          where: { id: ownedOrder.id, userId, status: 'PENDING' },
          data: {
            status: 'PAID',
            razorpayPaymentId: dto.razorpayPaymentId,
          },
        });
        if (claimed.count !== 1) {
          throw new BadRequestException('This order has already been processed');
        }

        const currentOrder = await tx.order.findUnique({
          where: { id: ownedOrder.id },
          include: { items: true },
        });
        if (!currentOrder) throw new NotFoundException('Order not found');

        for (const item of currentOrder.items) {
          const updated = await tx.product.updateMany({
            where: { id: item.productId, active: true, stock: { gte: item.quantity } },
            data: { stock: { decrement: item.quantity } },
          });
          if (updated.count !== 1) throw new InventoryShortageError(item.name);
        }

        const currentCart = await tx.cart.findUnique({
          where: { userId },
          select: { id: true },
        });
        if (currentCart) {
          for (const item of currentOrder.items) {
            await tx.cartItem.deleteMany({
              where: {
                cartId: currentCart.id,
                productId: item.productId,
                quantity: item.quantity,
              },
            });
          }
        }

        return currentOrder;
      });
    } catch (error) {
      if (!(error instanceof InventoryShortageError)) throw error;
      await razorpay.payments.refund(dto.razorpayPaymentId, {
        amount: payment.amount,
        notes: { orderId: ownedOrder.id, reason: 'inventory_unavailable' },
      });
      return this.prisma.order.update({
        where: { id: ownedOrder.id },
        data: { status: 'CANCELLED', razorpayPaymentId: dto.razorpayPaymentId },
        include: { items: true },
      });
    }
  }

  listMine(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async listAll(status?: string) {
    if (status && !Object.values(OrderStatus).includes(status as OrderStatus)) {
      throw new BadRequestException('Invalid order status');
    }
    return this.prisma.order.findMany({
      where: status ? { status: status as OrderStatus } : {},
      include: {
        user: { select: { id: true, name: true, email: true } },
        items: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatus(id: string, status: OrderStatus) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (!order) throw new NotFoundException('Order not found');
    if (order.status === 'PENDING' || order.status === 'CANCELLED') {
      throw new BadRequestException('Only paid orders can be updated by the admin');
    }
    const nextStatus: Partial<Record<OrderStatus, OrderStatus>> = {
      PAID: 'PROCESSING',
      PROCESSING: 'SHIPPED',
      SHIPPED: 'DELIVERED',
    };
    if (nextStatus[order.status] !== status) {
      throw new BadRequestException(`Order status must move to ${nextStatus[order.status] ?? 'a valid next state'}`);
    }
    return this.prisma.order.update({
      where: { id },
      data: { status },
      include: { items: true },
    });
  }

  private validateAddress(address: Record<string, unknown>): Prisma.InputJsonObject {
    const fields = ['name', 'email', 'phone', 'line1', 'city', 'state', 'postalCode'];
    const result: Record<string, string> = {};
    for (const field of fields) {
      const value = address[field];
      if (typeof value !== 'string' || !value.trim() || value.length > 200) {
        throw new BadRequestException(`A valid ${field} is required`);
      }
      result[field] = value.trim();
    }
    return result;
  }
}
