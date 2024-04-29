import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Orders } from './orders.entity';

@Entity({
  name: 'users',
})
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  password: string;

  @Column({ nullable: true, type: 'text' })
  address: string | null;

  @Column({ nullable: true, type: 'int' })
  phone: string | null;

  @Column({ nullable: true, length: 50 })
  country: string | null;

  @Column({ nullable: true, length: 50, type: 'varchar' })
  city: string | null;

  @OneToMany(() => Orders, (order) => order.user)
  @JoinColumn({ name: 'order_id' })
  orders: Orders[];
}
