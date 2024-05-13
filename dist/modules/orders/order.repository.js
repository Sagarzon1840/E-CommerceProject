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
exports.OrdersRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const orderDetails_entity_1 = require("../entities/orderDetails.entity");
const products_entity_1 = require("../entities/products.entity");
const users_entity_1 = require("../entities/users.entity");
const orders_entity_1 = require("../entities/orders.entity");
let OrdersRepository = class OrdersRepository {
    constructor(orderRepository, userRepository, orderDetailsRepository, productRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.orderDetailsRepository = orderDetailsRepository;
        this.productRepository = productRepository;
    }
    async createOrder(userId, products) {
        let total = 0;
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${userId} not found`);
        }
        const order = new orders_entity_1.Orders();
        order.date = new Date();
        order.user = user;
        const newOrder = await this.orderRepository.save(order);
        const productsArray = await Promise.all(products.map(async (element) => {
            const product = await this.productRepository.findOneBy({
                id: element.id,
            });
            if (!product) {
                throw new common_1.NotFoundException(`User with id ${element.id} not found`);
            }
            if (product.stock <= 0) {
                throw new common_1.NotFoundException(`Product with id ${product.id} doesnt have stock`);
            }
            total += Number(product.price);
            await this.productRepository.update({ id: element.id }, { stock: product.stock - 1 });
            return product;
        }));
        const orderDetail = new orderDetails_entity_1.OrderDetails();
        orderDetail.price = Number(Number(total).toFixed(2));
        orderDetail.products = productsArray;
        orderDetail.order = newOrder;
        await this.orderDetailsRepository.save(orderDetail);
        return await this.orderRepository.find({
            where: { id: newOrder.id },
            relations: { orderDetails: true },
        });
    }
    async getOrder(orderId) {
        const order = await this.orderRepository.findOne({
            where: { id: orderId },
            relations: {
                orderDetails: {
                    products: true,
                },
            },
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with id ${orderId} not found`);
        }
        return order;
    }
};
exports.OrdersRepository = OrdersRepository;
exports.OrdersRepository = OrdersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(orders_entity_1.Orders)),
    __param(1, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __param(2, (0, typeorm_1.InjectRepository)(orderDetails_entity_1.OrderDetails)),
    __param(3, (0, typeorm_1.InjectRepository)(products_entity_1.Products)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrdersRepository);
//# sourceMappingURL=order.repository.js.map