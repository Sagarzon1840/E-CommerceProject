import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
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
    const pageNumber = page ? Number(page) : 1;
    const limitNumber = limit ? Number(limit) : 5;
    return this.productsService.getProducts(pageNumber, limitNumber);
  }

  @HttpCode(201)
  @Get('seeder')
  createProducts() {
    return this.productsService.createProduct();
  }

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Put(':id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() product: Products,
  ) {
    return this.productsService.updateProduct(id, product);
  }

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.deleteProduct(id);
  }

  @HttpCode(200)
  @Get(':id')
  getProductById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProductById(id);
  }
}
