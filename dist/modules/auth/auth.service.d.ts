import { UserService } from '../users/users.service';
import { CreateUserDto } from 'src/dtos/userCreation.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    getAuth(): Promise<string>;
    signUp(user: CreateUserDto): Promise<{
        id: string;
        email: string;
        name: string;
        address: string;
        phone: number;
        country: string;
        city: string;
        orders: import("../entities/orders.entity").Orders[];
    }>;
    signIn(email: string, password: string): Promise<{
        success: string;
        token: string;
    }>;
}
