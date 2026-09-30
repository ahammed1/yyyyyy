import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { AuthenticatedRequest, JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CartService } from './cart.service';
import { SetCartItemDto } from './cart.dto';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cart: CartService) {}

  @Get()
  get(@Req() request: AuthenticatedRequest) {
    return this.cart.get(request.user.id);
  }

  @Put('items')
  setItem(@Req() request: AuthenticatedRequest, @Body() dto: SetCartItemDto) {
    return this.cart.setItem(request.user.id, dto);
  }
}
