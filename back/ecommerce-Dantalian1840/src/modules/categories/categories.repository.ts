import { Injectable } from '@nestjs/common';
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
    return this.categoryRepository.find();
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
