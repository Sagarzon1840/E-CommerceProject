import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Products } from './products.entity';

@Entity({
  name: 'categories',
})
export class Categories {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', length: 50, nullable: true, unique: true })
  name: string;

  //* Categories 1:N Products
  @OneToMany(() => Products, (product) => product.category)
  @JoinColumn()
  products: Products[];
}
