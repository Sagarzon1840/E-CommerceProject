import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrders(@Body() createOrder: any) {
    const { userId, products } = createOrder;
    return this.ordersService.createOrders(userId, products);
  }

  @Get(':id')
  getOrder(@Param('id') id: string) {
    return this.ordersService.getOrder(id);
  }
}
