import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from 'src/dtos/orderCreation.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(AuthGuard)
  createOrders(@Body() createOrder: CreateOrderDto) {
    const { userId, products } = createOrder;
    const orders = this.ordersService.createOrders(userId, products);
    if (!orders) throw new NotFoundException('Order creation error');
    return orders;
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getOrder(@Param('id', ParseUUIDPipe) id: string) {
    const order = this.ordersService.getOrder(id);
    if (!order) throw new NotFoundException(`Order with id ${id} not found`);
    return order;
  }
}
