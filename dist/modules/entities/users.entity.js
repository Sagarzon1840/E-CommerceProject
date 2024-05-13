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
exports.Users = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const orders_entity_1 = require("./orders.entity");
let Users = class Users {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String, description: "UUID generated automatically" }, email: { required: true, type: () => String, description: "Email, max 50 characters and unique" }, name: { required: true, type: () => String, description: "User name, max 50 characters" }, password: { required: true, type: () => String, description: "Password, it will be hashed, max characters 255" }, address: { required: true, type: () => String, nullable: true, description: "User adress" }, phone: { required: true, type: () => Number, nullable: true, description: "Phone number, bigint" }, country: { required: true, type: () => String, nullable: true, description: "Country value from user, max 50 characters" }, city: { required: true, type: () => String, nullable: true, description: "City value from user, max 50 characters" }, role: { required: true, type: () => Number, description: "User role, will be 'User' by default" }, orders: { required: true, type: () => [require("./orders.entity").Orders] } };
    }
};
exports.Users = Users;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Users.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: false, unique: true }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: false }),
    __metadata("design:type", String)
], Users.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: false }),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], Users.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'bigint' }),
    __metadata("design:type", Number)
], Users.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, length: 50 }),
    __metadata("design:type", String)
], Users.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, length: 50, type: 'varchar' }),
    __metadata("design:type", String)
], Users.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: 'smallint', default: 1 }),
    __metadata("design:type", Number)
], Users.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orders_entity_1.Orders, (order) => order.user),
    (0, typeorm_1.JoinColumn)({ name: 'order_id' }),
    __metadata("design:type", Array)
], Users.prototype, "orders", void 0);
exports.Users = Users = __decorate([
    (0, typeorm_1.Entity)({
        name: 'users',
    })
], Users);
//# sourceMappingURL=users.entity.js.map