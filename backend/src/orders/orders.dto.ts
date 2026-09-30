import {
  IsIn,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CheckoutDto {
  @IsObject()
  shippingAddress: Record<string, unknown>;
}

export class VerifyPaymentDto {
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  razorpayPaymentId: string;

  @IsString()
  @MinLength(1)
  @MaxLength(100)
  razorpayOrderId: string;

  @IsString()
  @MinLength(1)
  @MaxLength(256)
  razorpaySignature: string;
}

export class UpdateOrderDto {
  @IsIn(['PROCESSING', 'SHIPPED', 'DELIVERED'])
  status: 'PROCESSING' | 'SHIPPED' | 'DELIVERED';
}

export class ListOrdersQueryDto {
  @IsOptional()
  @IsString()
  @MaxLength(30)
  status?: string;
}
