import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Products } from './products.entity';

@Entity({
  name: 'categories',
})
export class Categories {
  /**
   * UUID generated automatically
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Category name, maximum 50 characters and unique value
   */
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name: string;

  //* Categories 1:N Products
  @OneToMany(() => Products, (product) => product.category)
  @JoinColumn()
  products: Products[];
}
