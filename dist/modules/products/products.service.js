"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const products_entity_1 = require("../entities/products.entity");
const typeorm_2 = require("typeorm");
const categories_entity_1 = require("../entities/categories.entity");
const data = require("../../utils/data.json");
let ProductsService = class ProductsService {
    constructor(productRepository, categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }
    async getProducts(page, limit) {
        let products = await this.productRepository.find({
            relations: { category: true },
        });
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        products = products.slice(startIndex, endIndex);
        return products;
    }
    async getProductById(id) {
        const product = await this.productRepository.findOneBy({ id });
        if (!product) {
            throw new common_1.NotFoundException(`Product with id ${id} not found`);
        }
        return product;
    }
    async createProduct() {
        const categories = await this.categoryRepository.find();
        data?.map(async (element) => {
            const category = categories.find((category) => category.name === element.category);
            const product = new products_entity_1.Products();
            product.name = element.name;
            product.description = element.description;
            product.price = element.price;
            product.imgUrl = element.imgUrl;
            product.stock = element.stock;
            product.category = category;
            await this.productRepository
                .createQueryBuilder()
                .insert()
                .into(products_entity_1.Products)
                .values(product)
                .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
                .execute();
        });
        return 'Products added successfuly';
    }
    async updateProduct(id, product) {
        await this.productRepository.update(id, product);
        const foundProduct = await this.productRepository.findOneBy({ id });
        if (!foundProduct)
            throw new common_1.NotFoundException(`Product with id ${id} not found`);
        return foundProduct;
    }
    async deleteProduct(id) {
        const foundProduct = this.productRepository.findOneBy({ id });
        if (foundProduct) {
            await this.productRepository.delete({ id });
            return id;
        }
        throw new common_1.NotFoundException(`Product with id ${id} not found`);
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(products_entity_1.Products)),
    __param(1, (0, typeorm_1.InjectRepository)(categories_entity_1.Categories)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductsService);
//# sourceMappingURL=products.service.js.map