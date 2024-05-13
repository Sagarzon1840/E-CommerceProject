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
exports.CreateOrderDto = exports.ProductDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class ProductDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String, description: "A valid ID from a product in existence", example: "d12345c6-e091-4e79-aa54-4994fa37a526" } };
    }
}
exports.ProductDto = ProductDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ProductDto.prototype, "id", void 0);
class CreateOrderDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { userId: { required: true, type: () => String, description: "Fill with the respective userID.", example: "cd1f0855-535f-487e-af1d-fc0925227034" }, products: { required: true, type: () => [require("./orderCreation.dto").ProductDto], description: "Needed to send each product ID to make an order." } };
    }
}
exports.CreateOrderDto = CreateOrderDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, swagger_1.ApiProperty)({
        type: [ProductDto],
        example: [
            { id: 'd12345c6-e091-4e79-aa54-4994fa37a526' },
            { id: 'd12345c6-e091-4e79-aa54-4994fa37a526' },
        ],
    }),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "products", void 0);
//# sourceMappingURL=orderCreation.dto.js.map