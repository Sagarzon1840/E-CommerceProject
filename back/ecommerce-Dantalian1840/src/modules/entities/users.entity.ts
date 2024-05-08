import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Orders } from './orders.entity';

@Entity({
  name: 'users',
})
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false }) // CAMBIO A MAYOR LENGTH POR LA EXTENSIÓN DEL HASH 72
  password: string;

  @Column({ nullable: true, type: 'text' })
  address: string | null;

  @Column({ nullable: true, type: 'int' })
  phone: number | null;

  @Column({ type: 'varchar', nullable: true, length: 50 })
  country: string | null;

  @Column({ nullable: true, length: 50, type: 'varchar' })
  city: string | null;

  @Index()
  @Column({ type: 'smallint', default: 1 })
  role: number;

  @OneToMany(() => Orders, (order) => order.user)
  @JoinColumn({ name: 'order_id' })
  orders: Orders[];
}
