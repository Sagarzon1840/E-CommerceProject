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
exports.Files = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let Files = class Files {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number, description: "UUID generated automatically" }, name: { required: true, type: () => String }, mimeType: { required: true, type: () => String }, data: { required: true, type: () => Object } };
    }
};
exports.Files = Files;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Files.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Files.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Files.prototype, "mimeType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bytea' }),
    __metadata("design:type", Buffer)
], Files.prototype, "data", void 0);
exports.Files = Files = __decorate([
    (0, typeorm_1.Entity)({
        name: 'files',
    })
], Files);
//# sourceMappingURL=files.entity.js.map