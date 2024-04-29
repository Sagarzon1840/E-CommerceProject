import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetails } from '../entities/orderDetails.entity';
import { Products } from '../entities/products.entity';
import { Users } from '../entities/users.entity';
import { Orders } from '../entities/orders.entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Orders) private orderRepository: Repository<Orders>,
    @InjectRepository(Users) private userRepository: Repository<Users>,
    @InjectRepository(OrderDetails)
    private orderDetailsRepository: Repository<OrderDetails>,
    @InjectRepository(Products) private productRepository: Repository<Products>,
  ) {}

  async createOrder(userId: string, products: any) {
    let total = 0;

    //Verificación del usuario
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      return `User with id ${userId} not found`;
    }

    const order = new Orders();
    order.date = new Date();
    order.user = user;

    //Agregar a la BD
    const newOrder = await this.orderRepository.save(order);

    // Asociación de la id con el producto
    const productsArray = await Promise.all(
      products.map(async (element) => {
        //!VALIDAR STOCK con atributo stock o con stock 0

        const product = await this.productRepository.findOneBy({
          id: element.id,
        });

        // VALIDAR LA EXISTENCIA DE LOS PRODUCTOS
        if (!product) {
          return `Product with id ${element.id} not founded`;
        }

        //Calcular el precio total
        total += Number(product.price);

        //Actualización del stock
        await this.productRepository.update(
          { id: element.id },
          { stock: product.stock - 1 },
        );

        return product;
      }),
    );

    //Creación del orderDetail y agregado a la BD
    const orderDetail = new OrderDetails();

    orderDetail.price = Number(Number(total).toFixed(2));
    orderDetail.products = productsArray; //! revisar
    orderDetail.order = newOrder;

    await this.orderDetailsRepository.save(orderDetail);

    //Envío al cliente con la compra y la info
    return await this.orderRepository.find({
      where: { id: newOrder.id },
      relations: { orderDetails: true },
    });
  }

  async getOrder(orderId: string) {
    const order = await this.orderRepository.findOne({
      where: { id: orderId },
      relations: {
        orderDetails: {
          products: true,
        },
      },
    });

    if (!order) {
      return `Order with id ${orderId} not found`;
    }
    return order;
  }
}
