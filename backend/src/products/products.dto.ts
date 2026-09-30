import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  name: string;

  @IsString()
  @MinLength(2)
  @MaxLength(40)
  sku: string;

  @IsString()
  @MinLength(2)
  @MaxLength(120)
  category: string;

  @IsString()
  @MinLength(5)
  @MaxLength(2000)
  description: string;

  @IsInt()
  @Min(1)
  @Max(100000000)
  price: number;

  @IsInt()
  @Min(0)
  @Max(1000000)
  stock: number;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  image?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(40)
  sku?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  category?: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(2000)
  description?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100000000)
  price?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1000000)
  stock?: number;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  image?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
