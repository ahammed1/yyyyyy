import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedRequest, JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CheckoutDto, ListOrdersQueryDto, UpdateOrderDto, VerifyPaymentDto } from './orders.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly orders: OrdersService) {}

  @Post('checkout')
  checkout(@Req() request: AuthenticatedRequest, @Body() dto: CheckoutDto) {
    return this.orders.checkout(request.user.id, dto);
  }

  @Post('verify-payment')
  verifyPayment(@Req() request: AuthenticatedRequest, @Body() dto: VerifyPaymentDto) {
    return this.orders.verifyPayment(request.user.id, dto);
  }

  @Get()
  listMine(@Req() request: AuthenticatedRequest) {
    return this.orders.listMine(request.user.id);
  }

  @Get('admin/all')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  listAll(@Query() query: ListOrdersQueryDto) {
    return this.orders.listAll(query.status);
  }

  @Patch(':id/status')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
    return this.orders.updateStatus(id, dto.status);
  }
}
