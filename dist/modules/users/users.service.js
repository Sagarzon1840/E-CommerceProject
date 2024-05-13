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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_entity_1 = require("../entities/users.entity");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async getUsers(page, limit) {
        const skip = (page - 1) * limit;
        const users = await this.usersRepository.find({
            take: limit,
            skip: skip,
        });
        return users.map(({ password, ...userNoPassword }) => userNoPassword);
    }
    async getUserById(id) {
        const user = await this.usersRepository.findOne({
            where: { id },
            relations: {
                orders: true,
            },
        });
        if (!user)
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        const { password, role, ...userNoPassword } = user;
        return userNoPassword;
    }
    async findByEmail(email) {
        const user = await this.usersRepository.findOneBy({ email });
        if (!user) {
            return null;
        }
        return user;
    }
    async createUsers(user) {
        const newUser = await this.usersRepository.save(user);
        const { password, role, ...userNoPassword } = newUser;
        if (!userNoPassword)
            throw new common_1.BadRequestException(`User creation failed`);
        return userNoPassword;
    }
    async updateUser(id, user) {
        try {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            if (!hashedPassword) {
                throw new common_1.BadRequestException('Password could not be hashed');
            }
            await this.usersRepository.update(id, {
                ...user,
                password: hashedPassword,
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('Error actualizando usuario');
        }
        const foundUser = await this.usersRepository.findOneBy({ id });
        if (!foundUser)
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        const { password, role, ...userNoPassword } = foundUser;
        return userNoPassword;
    }
    async deleteUser(id) {
        const foundUser = await this.usersRepository.findOneBy({ id });
        if (!foundUser)
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        this.usersRepository.remove(foundUser);
        const { password, role, ...userNoPassword } = foundUser;
        return userNoPassword;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=users.service.js.map