import {
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
  ValidateNested,
  IsUUID,
  ArrayNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Importa la anotación ApiProperty

export class ProductDto {
  /**
A valid ID from a product in existence
@example d12345c6-e091-4e79-aa54-4994fa37a526
   */
  @IsNotEmpty()
  @IsUUID()
  id: string;
}

export class CreateOrderDto {
  /**
   * Fill with the respective userID.
   * @example cd1f0855-535f-487e-af1d-fc0925227034
   */
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  /**
   * Needed to send each product ID to make an order.
   *    */
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @ApiProperty({
    type: [ProductDto],
    example: [
      { id: 'd12345c6-e091-4e79-aa54-4994fa37a526' },
      { id: 'd12345c6-e091-4e79-aa54-4994fa37a526' },
    ],
  })
  products: ProductDto[];
}
