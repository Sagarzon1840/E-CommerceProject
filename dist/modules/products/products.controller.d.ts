import { ProductsService } from './products.service';
import { CreateProductDto } from 'src/dtos/productCreation.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getProducts(page: string, limit: string): Promise<import("../entities/products.entity").Products[]>;
    createProducts(): Promise<string>;
    updateProduct(id: string, product: CreateProductDto): Promise<import("../entities/products.entity").Products>;
    deleteProduct(id: string): Promise<string>;
    getProductById(id: string): Promise<import("../entities/products.entity").Products>;
}
