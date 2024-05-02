import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '../auth/auth.guard';
import { Products } from '../entities/products.entity';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';

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
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Put(':id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() product: Products,
  ) {
    const foundUser = this.productsService.updateProduct(id, product);
    if (!foundUser) throw new NotFoundException(`User with id ${id} not found`);
    return foundUser;
  }

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    const foundUser = this.productsService.deleteProduct(id);

    if (!foundUser) throw new NotFoundException(`User with id ${id} not found`);
    return foundUser;
  }

  @HttpCode(200)
  @Get(':id')
  getProductById(@Param('id', ParseUUIDPipe) id: string) {
    const foundUser = this.productsService.getProductById(id);

    if (!foundUser) throw new NotFoundException(`User with id ${id} not found`);
    return foundUser;
  }
}
