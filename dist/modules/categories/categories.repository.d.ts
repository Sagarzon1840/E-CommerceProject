import { Categories } from '../entities/categories.entity';
import { Repository } from 'typeorm';
export declare class CategoriesRepository {
    private readonly categoryRepository;
    constructor(categoryRepository: Repository<Categories>);
    getCategories(): Promise<Categories[]>;
    addCategory(): Promise<string>;
}
