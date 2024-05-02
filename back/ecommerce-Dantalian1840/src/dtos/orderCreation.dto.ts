import {
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
  ValidateNested,
  IsUUID,
  ArrayNotEmpty,
} from 'class-validator';
import { Products } from 'src/modules/entities/products.entity';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  products: Partial<Products[]>;
}
