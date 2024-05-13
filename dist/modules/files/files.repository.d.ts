import { Repository } from 'typeorm';
import { Products } from '../entities/products.entity';
import { CloudinaryService } from './cloudinary.service';
export declare class FilesRepository {
    private productRepository;
    private readonly cloudinaryService;
    constructor(productRepository: Repository<Products>, cloudinaryService: CloudinaryService);
    save(id: string, file: any): Promise<string>;
}
