import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '../auth/auth.guard';
import { Products } from '../entities/products.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @HttpCode(200)
  @Get()
  getProducts(@Query('page') page: string, @Query('limit') limit: string) {
    return this.productsService.getProducts(Number(page), Number(limit));
  }

  @HttpCode(201)
  @UseGuards(AuthGuard)
  @Post()
  createProducts() {
    return this.productsService.createProduct();
  }

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() product: Products) {
    return this.productsService.updateProduct(id, product);
  }

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }

  @HttpCode(200)
  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }
}
