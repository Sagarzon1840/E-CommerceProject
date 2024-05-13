import { Repository } from 'typeorm';
import { OrderDetails } from '../entities/orderDetails.entity';
import { Products } from '../entities/products.entity';
import { Users } from '../entities/users.entity';
import { Orders } from '../entities/orders.entity';
export declare class OrdersRepository {
    private orderRepository;
    private userRepository;
    private orderDetailsRepository;
    private productRepository;
    constructor(orderRepository: Repository<Orders>, userRepository: Repository<Users>, orderDetailsRepository: Repository<OrderDetails>, productRepository: Repository<Products>);
    createOrder(userId: string, products: Products[]): Promise<Orders[]>;
    getOrder(orderId: string): Promise<Orders>;
}
