import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from '../entities/categories.entity';
import { Repository } from 'typeorm';
import * as data from '../../utils/data.json';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Categories)
    private readonly categoryRepository: Repository<Categories>,
  ) {}

  async getCategories(): Promise<Categories[]> {
    const categoryFinder = this.categoryRepository.find();
    if (!categoryFinder) throw new NotFoundException(`Categories not found`);
    return categoryFinder;
  }

  async addCategory(): Promise<string> {
    data?.map(async (element) => {
      await this.categoryRepository
        .createQueryBuilder()
        .insert()
        .into(Categories)
        .values({ name: element.category })
        .orIgnore()
        .execute();
    });
    return 'Added Categories';
  }
}
