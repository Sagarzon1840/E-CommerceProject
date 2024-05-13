"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const userCreation_dto_1 = require("./userCreation.dto");
class LoginUserDto extends (0, swagger_1.PickType)(userCreation_dto_1.CreateUserDto, [
    'email',
    'password',
]) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.LoginUserDto = LoginUserDto;
//# sourceMappingURL=loginUser.dto.js.map