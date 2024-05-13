import { Repository } from 'typeorm';
import { Users } from '../entities/users.entity';
export declare class UserService {
    private usersRepository;
    constructor(usersRepository: Repository<Users>);
    getUsers(page: number, limit: number): Promise<{
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
    findByEmail(email: string): Promise<Users>;
    createUsers(user: Partial<Users>): Promise<{
        id: string;
        email: string;
        name: string;
        address: string;
        phone: number;
        country: string;
        city: string;
        orders: import("../entities/orders.entity").Orders[];
    }>;
    updateUser(id: string, user: Partial<Users>): Promise<{
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
}
