import { Injectable } from '@nestjs/common';
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

  async getProducts(page: number, limit: number) {
    const product = await this.productRepository.find();
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const productList = product.slice(startIndex, endIndex);
    const productStock = productList.filter((product) => product.stock !== 0);
    return productStock;
  }
  async getProductById(id: string) {
    const product = await this.productRepository.findOneBy({ id });
    // if(!product){
    //   return
    // }
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

  async updateProduct(id: string, product: Products) {
    await this.productRepository.update(id, product);
    const updatedProduct = await this.productRepository.findOneBy({ id });
    return updatedProduct;
  }

  async deleteProduct(id: string) {
    const foundProduct = this.productRepository.findOneBy({ id });
    if (foundProduct) {
      await this.productRepository.delete({ id });
      return id;
    }
    return null;
  }
}
