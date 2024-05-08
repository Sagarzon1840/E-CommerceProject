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
  /**
   * UUID generated automatically
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Email, max 50 characters and unique
   */
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  email: string;

  /**
   * User name, max 50 characters
   */
  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  /**
   * Password, it will be hashed, max characters 255
   */
  @Column({ type: 'varchar', length: 255, nullable: false }) // CAMBIO A MAYOR LENGTH POR LA EXTENSIÓN DEL HASH 72
  password: string;

  /**
   * User adress
   */
  @Column({ nullable: true, type: 'text' })
  address: string | null;

  /**
   * Phone number, bigint
   */
  @Column({ nullable: true, type: 'bigint' })
  phone: number | null;

  /**
   * Country value from user, max 50 characters
   */
  @Column({ type: 'varchar', nullable: true, length: 50 })
  country: string | null;

  /**
   * City value from user, max 50 characters
   */
  @Column({ nullable: true, length: 50, type: 'varchar' })
  city: string | null;

  /**
   * User role, will be 'User' by default
   */
  @Index()
  @Column({ type: 'smallint', default: 1 })
  role: number;

  @OneToMany(() => Orders, (order) => order.user)
  @JoinColumn({ name: 'order_id' })
  orders: Orders[];
}
