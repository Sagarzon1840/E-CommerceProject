import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Categories } from './categories.entity';
import { OrderDetails } from './orderDetails.entity';

export class ColumnNumericTransformer {
  to(data: number): number {
    return data;
  }
  from(data: string): number {
    return parseFloat(data);
  }
}

@Entity({
  name: 'products',
})
export class Products {
  /**
   * UUID generated automatically
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Product name, max 50 characters and unique value
   */
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name: string;

  /**
   * Product description
   */
  @Column({ type: 'text', nullable: false })
  description: string;

  /**
   * Product price, may be decimal
   */
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    transformer: new ColumnNumericTransformer(),
  })
  price: number;

  /**
   * Product stock
   */
  @Column({ type: 'int', nullable: false })
  stock: number;

  /**
   * Product url, may be empty
   */
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
