import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { Categories } from '../entities/categories.entity';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async getCategories(): Promise<Categories[]> {
    return this.categoriesRepository.getCategories();
  }

  async addCategories(): Promise<string> {
    return this.categoriesRepository.addCategory();
  }
}
