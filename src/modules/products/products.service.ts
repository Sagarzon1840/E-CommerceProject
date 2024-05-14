import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from '../entities/products.entity';
import { Repository } from 'typeorm';
import { Categories } from '../entities/categories.entity';
import * as data from '../../utils/data.json';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products) private productRepository: Repository<Products>,
    @InjectRepository(Categories)
    private categoryRepository: Repository<Categories>,
  ) {}

  async getProducts(page: number, limit: number): Promise<Products[]> {
    let products = await this.productRepository.find({
      relations: { category: true },
    });
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    products = products.slice(startIndex, endIndex);

    return products;
  }

  async getProductById(id: string) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async createProduct() {
    const categories = await this.categoryRepository.find();
    data?.map(async (element) => {
      const category = categories.find(
        (category) => category.name === element.category,
      );

      //Creación del nuevo product con atributos
      const product = new Products();
      product.name = element.name;
      product.description = element.description;
      product.price = element.price;
      product.imgUrl = element.imgUrl;
      product.stock = element.stock;
      product.category = category;

      //Guardado del producto en la DB
      await this.productRepository
        .createQueryBuilder()
        .insert()
        .into(Products)
        .values(product)
        //Si existe, se actualiza
        .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
        .execute();
    });
    return 'Products added successfuly';
  }

  async updateProduct(id: string, product: Partial<Products>) {
    await this.productRepository.update(id, product);

    const foundProduct = await this.productRepository.findOneBy({ id });
    if (!foundProduct)
      throw new NotFoundException(`Product with id ${id} not found`);

    return foundProduct;
  }

  async deleteProduct(id: string) {
    const foundProduct = this.productRepository.findOneBy({ id });
    if (foundProduct) {
      await this.productRepository.delete({ id });
      return id;
    }
    throw new NotFoundException(`Product with id ${id} not found`);
  }
}
