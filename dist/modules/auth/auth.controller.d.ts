import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dtos/userCreation.dto';
import { LoginUserDto } from 'src/dtos/loginUser.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    signIn(loginUserDto: LoginUserDto): Promise<{
        success: string;
        token: string;
    }>;
}
