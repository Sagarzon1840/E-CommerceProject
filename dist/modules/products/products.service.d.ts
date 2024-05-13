import { Products } from '../entities/products.entity';
import { Repository } from 'typeorm';
import { Categories } from '../entities/categories.entity';
export declare class ProductsService {
    private productRepository;
    private categoryRepository;
    constructor(productRepository: Repository<Products>, categoryRepository: Repository<Categories>);
    getProducts(page: number, limit: number): Promise<Products[]>;
    getProductById(id: string): Promise<Products>;
    createProduct(): Promise<string>;
    updateProduct(id: string, product: Partial<Products>): Promise<Products>;
    deleteProduct(id: string): Promise<string>;
}
