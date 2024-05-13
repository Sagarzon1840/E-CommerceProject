import { CategoriesRepository } from './categories.repository';
import { Categories } from '../entities/categories.entity';
export declare class CategoriesService {
    private readonly categoriesRepository;
    constructor(categoriesRepository: CategoriesRepository);
    getCategories(): Promise<Categories[]>;
    addCategories(): Promise<string>;
}
