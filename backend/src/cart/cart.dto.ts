import { Type } from 'class-transformer';
import { IsInt, IsString, Max, Min, MinLength } from 'class-validator';

export class SetCartItemDto {
  @IsString()
  @MinLength(1)
  productId: string;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(100)
  quantity: number;
}
