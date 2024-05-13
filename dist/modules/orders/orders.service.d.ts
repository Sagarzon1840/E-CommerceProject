import { OrdersRepository } from './order.repository';
export declare class OrdersService {
    private ordersRepository;
    constructor(ordersRepository: OrdersRepository);
    createOrders(userId: string, products: any): Promise<import("../entities/orders.entity").Orders[]>;
    getOrder(id: string): Promise<import("../entities/orders.entity").Orders>;
}
