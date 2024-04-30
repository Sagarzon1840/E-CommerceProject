import {
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ProductDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products: ProductDto[];
}
