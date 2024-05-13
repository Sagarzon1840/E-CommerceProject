import { UserService } from './users.service';
import { CreateUserDto } from 'src/dtos/userCreation.dto';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(page?: number, limit?: number): Promise<{
        id: string;
        email: string;
        name: string;
        address: string;
        phone: number;
        country: string;
        city: string;
        role: number;
        orders: import("../entities/orders.entity").Orders[];
    }[]>;
    updateUser(id: string, user: CreateUserDto): Promise<{
        id: string;
        email: string;
        name: string;
        address: string;
        phone: number;
        country: string;
        city: string;
        orders: import("../entities/orders.entity").Orders[];
    }>;
    deleteUser(id: string): Promise<{
        id: string;
        email: string;
        name: string;
        address: string;
        phone: number;
        country: string;
        city: string;
        orders: import("../entities/orders.entity").Orders[];
    }>;
    getUserById(id: string): Promise<{
        id: string;
        email: string;
        name: string;
        address: string;
        phone: number;
        country: string;
        city: string;
        orders: import("../entities/orders.entity").Orders[];
    }>;
}
