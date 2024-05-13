import { OrdersService } from './orders.service';
import { CreateOrderDto } from 'src/dtos/orderCreation.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    createOrders(createOrder: CreateOrderDto): Promise<import("../entities/orders.entity").Orders[]>;
    getOrder(id: string): Promise<import("../entities/orders.entity").Orders>;
}
