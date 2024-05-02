import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from '../entities/products.entity';
import { CloudinaryService } from './claudinary.service';

@Injectable()
export class FilesRepository {
  constructor(
    @InjectRepository(Products) private productRepository: Repository<Products>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async save(id: string, file) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    const url = this.cloudinaryService.uploadImage(file);
    product.imgUrl = (await url).secure_url;
    await this.productRepository.update(id, product);
    return `Your updated product image is: ${product.imgUrl}`;
  }
}
