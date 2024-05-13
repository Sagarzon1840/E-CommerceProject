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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const roles_enum_1 = require("../../enums/roles.enum");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async getAuth() {
        return 'Auth Service!';
    }
    async signUp(user) {
        const { passwordConfirm, ...userNoPasswordConfirm } = user;
        const foundUser = await this.userService.findByEmail(user.email);
        if (foundUser) {
            throw new common_1.BadRequestException('Email already exist');
        }
        if (passwordConfirm !== userNoPasswordConfirm.password) {
            throw new common_1.BadRequestException('Passwords dont match');
        }
        const hashedPassword = await bcrypt.hash(userNoPasswordConfirm.password, 10);
        if (!hashedPassword) {
            throw new common_1.BadRequestException('Password could not be hashed');
        }
        const dbUser = await this.userService.createUsers({
            ...userNoPasswordConfirm,
            password: hashedPassword,
        });
        if (!dbUser)
            throw new common_1.BadRequestException('User could not be created');
        return dbUser;
    }
    async signIn(email, password) {
        const foundUser = await this.userService.findByEmail(email);
        const isPasswordValid = await bcrypt.compare(password, foundUser.password);
        if (!foundUser || !isPasswordValid)
            throw new common_1.BadRequestException('Incorrect credentials');
        const userRoles = [];
        if (foundUser.role) {
            if (foundUser.role === roles_enum_1.Role.Admin) {
                userRoles.push(roles_enum_1.Role.Admin);
            }
            if (foundUser.role === roles_enum_1.Role.SuperAdmin) {
                userRoles.push(roles_enum_1.Role.SuperAdmin);
            }
            else {
                userRoles.push(roles_enum_1.Role.User);
            }
        }
        const userPayload = {
            sub: foundUser.id,
            id: foundUser.id,
            email: foundUser.email,
            roles: userRoles,
        };
        const token = this.jwtService.sign(userPayload);
        return { success: 'Successful Login', token };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map