import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Orders } from '../entities/orders.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetails } from '../entities/orderDetails.entity';
import { Users } from '../entities/users.entity';
import { Products } from '../entities/products.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Orders]),
    TypeOrmModule.forFeature([Users]),
    TypeOrmModule.forFeature([OrderDetails]),
    TypeOrmModule.forFeature([Products]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
