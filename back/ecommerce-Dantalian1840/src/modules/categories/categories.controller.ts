import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Categories } from '../entities/categories.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getCategories(): Promise<Categories[]> {
    return this.categoriesService.getCategories();
  }

  @Get('seeder')
  addCategory(): Promise<string> {
    return this.categoriesService.addCategories();
  }
}
