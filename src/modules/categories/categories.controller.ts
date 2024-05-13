import { Controller, Get, NotFoundException } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Categories } from '../entities/categories.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getCategories(): Promise<Categories[]> {
    const categories = this.categoriesService.getCategories();
    if (!categories) throw new NotFoundException(`Categores get error`);
    return categories;
  }

  @Get('seeder')
  addCategory(): Promise<string> {
    const category = this.categoriesService.addCategories();
    if (!category) throw new NotFoundException('Category loader error');
    return category;
  }
}
