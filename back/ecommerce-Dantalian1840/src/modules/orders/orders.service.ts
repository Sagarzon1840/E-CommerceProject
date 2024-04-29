import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './order.repository';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  createOrders(userId: string, products: any) {
    return this.ordersRepository.createOrder(userId, products);
  }

  getOrder(id: string) {
    return this.ordersRepository.getOrder(id);
  }
}
