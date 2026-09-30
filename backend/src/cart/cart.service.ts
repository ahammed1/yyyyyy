import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SetCartItemDto } from './cart.dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async get(userId: string) {
    const cart = await this.prisma.cart.upsert({
      where: { userId },
      create: { userId },
      update: {},
      include: { items: { include: { product: true }, orderBy: { id: 'asc' } } },
    });
    return this.format(cart);
  }

  async setItem(userId: string, dto: SetCartItemDto) {
    const product = await this.prisma.product.findFirst({
      where: { id: dto.productId, active: true },
    });
    if (!product) throw new NotFoundException('Product not found');
    if (dto.quantity > product.stock) {
      throw new BadRequestException(`Only ${product.stock} item(s) are in stock`);
    }

    const cart = await this.prisma.cart.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    if (dto.quantity === 0) {
      await this.prisma.cartItem.deleteMany({
        where: { cartId: cart.id, productId: product.id },
      });
    } else {
      await this.prisma.cartItem.upsert({
        where: { cartId_productId: { cartId: cart.id, productId: product.id } },
        create: { cartId: cart.id, productId: product.id, quantity: dto.quantity },
        update: { quantity: dto.quantity },
      });
    }

    return this.get(userId);
  }

  async clear(userId: string) {
    const cart = await this.prisma.cart.findUnique({ where: { userId } });
    if (cart) await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    return { items: [], itemCount: 0, total: 0, currency: 'INR' };
  }

  private format(cart: {
    items: Array<{
      quantity: number;
      product: {
        id: string;
        name: string;
        price: number;
        image: string;
        stock: number;
        active: boolean;
      };
    }>;
  }) {
    const items = cart.items
      .filter((item) => item.product.active)
      .map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        image: item.product.image,
        stock: item.product.stock,
        quantity: item.quantity,
        lineTotal: item.product.price * item.quantity,
      }));
    return {
      items,
      itemCount: items.reduce((count, item) => count + item.quantity, 0),
      total: items.reduce((total, item) => total + item.lineTotal, 0),
      currency: 'INR',
    };
  }
}
