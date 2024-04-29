import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Categories } from './categories.entity';
import { OrderDetails } from './orderDetails.entity';

@Entity({
  name: 'products',
})
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({})
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'int', nullable: false })
  stock: number;

  @Column({
    type: 'text',
    nullable: true,
    default:
      'https://www.netambulo.com/storage/2011/12/404-not-found-gatito.jpg',
  })
  imgUrl: string;

  //* Products N:1 Categories
  @ManyToOne(() => Categories, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Categories;

  //*Products N:N OrderDetails
  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
  orderDetails: OrderDetails[];
}
