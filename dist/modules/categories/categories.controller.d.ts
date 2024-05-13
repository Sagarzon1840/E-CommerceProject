import { CategoriesService } from './categories.service';
import { Categories } from '../entities/categories.entity';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    getCategories(): Promise<Categories[]>;
    addCategory(): Promise<string>;
}
