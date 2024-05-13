import { CreateUserDto } from './userCreation.dto';
declare const LoginUserDto_base: import("@nestjs/common").Type<Pick<CreateUserDto, "email" | "password">>;
export declare class LoginUserDto extends LoginUserDto_base {
}
export {};
