import { IsString, IsNotEmpty, IsNumber, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Logitech G502 Pro' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'The best mouse in the world' })
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 39.99 })
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 12 })
  stock: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({
    example:
      'https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg',
  })
  imgUrl: string;
}
