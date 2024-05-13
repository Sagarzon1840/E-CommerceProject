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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = exports.ColumnNumericTransformer = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const categories_entity_1 = require("./categories.entity");
const orderDetails_entity_1 = require("./orderDetails.entity");
class ColumnNumericTransformer {
    to(data) {
        return data;
    }
    from(data) {
        return parseFloat(data);
    }
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.ColumnNumericTransformer = ColumnNumericTransformer;
let Products = class Products {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String, description: "UUID generated automatically" }, name: { required: true, type: () => String, description: "Product name, max 50 characters and unique value" }, description: { required: true, type: () => String, description: "Product description" }, price: { required: true, type: () => Number, description: "Product price, may be decimal" }, stock: { required: true, type: () => Number, description: "Product stock" }, imgUrl: { required: true, type: () => String, description: "Product url, may be empty" }, category: { required: true, type: () => require("./categories.entity").Categories }, orderDetails: { required: true, type: () => [require("./orderDetails.entity").OrderDetails] } };
    }
};
exports.Products = Products;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Products.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: false, unique: true }),
    __metadata("design:type", String)
], Products.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: false }),
    __metadata("design:type", String)
], Products.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
        transformer: new ColumnNumericTransformer(),
    }),
    __metadata("design:type", Number)
], Products.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], Products.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: true,
        default: 'https://www.netambulo.com/storage/2011/12/404-not-found-gatito.jpg',
    }),
    __metadata("design:type", String)
], Products.prototype, "imgUrl", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categories_entity_1.Categories, (category) => category.products),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    __metadata("design:type", categories_entity_1.Categories)
], Products.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orderDetails_entity_1.OrderDetails, (orderDetails) => orderDetails.products),
    __metadata("design:type", Array)
], Products.prototype, "orderDetails", void 0);
exports.Products = Products = __decorate([
    (0, typeorm_1.Entity)({
        name: 'products',
    })
], Products);
//# sourceMappingURL=products.entity.js.map