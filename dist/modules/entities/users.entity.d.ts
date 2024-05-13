import { Orders } from './orders.entity';
export declare class Users {
    id: string;
    email: string;
    name: string;
    password: string;
    address: string | null;
    phone: number | null;
    country: string | null;
    city: string | null;
    role: number;
    orders: Orders[];
}
