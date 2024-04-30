import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Orders } from './orders.entity';
import { Products } from './products.entity';

@Entity({
  name: 'orderdetails',
})
export class OrderDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  //* OrderDetails 1:1 Orders
  @OneToOne(() => Orders, (order) => order.orderDetails)
  @JoinColumn({ name: 'order_id' })
  order: Orders;

  //* OrderDetails N:N Products
  @ManyToMany(() => Products)
  @JoinTable({
    name: 'orderdetails_products',
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'orderdetail_id',
      referencedColumnName: 'id',
    },
  })
  products: Products[];
}
