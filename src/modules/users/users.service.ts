/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entities/users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async getUsers(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const users = await this.usersRepository.find({
      take: limit,
      skip: skip,
    });

    return users.map(({ password, ...userNoPassword }) => userNoPassword);
  }
  async getUserById(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: {
        orders: true,
      },
    });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    const { password, role, ...userNoPassword } = user;
    return userNoPassword;
  }
  async findByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email });
    if (!user) {
      return null;
    }

    return user;
  }

  async createUsers(user: Partial<Users>) {
    const newUser = await this.usersRepository.save(user);
    const { password, role, ...userNoPassword } = newUser;
    if (!userNoPassword) throw new BadRequestException(`User creation failed`);
    return userNoPassword;
  }

  async updateUser(id: string, user: Partial<Users>) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      if (!hashedPassword) {
        throw new BadRequestException('Password could not be hashed');
      }
      await this.usersRepository.update(id, {
        ...user,
        password: hashedPassword,
      });
    } catch (error) {
      throw new BadRequestException('Error actualizando usuario');
    }
    const foundUser = await this.usersRepository.findOneBy({ id });

    if (!foundUser) throw new NotFoundException(`User with id ${id} not found`);

    const { password, role, ...userNoPassword } = foundUser;
    return userNoPassword;
  }

  async deleteUser(id: string) {
    const foundUser = await this.usersRepository.findOneBy({ id });

    if (!foundUser) throw new NotFoundException(`User with id ${id} not found`);

    this.usersRepository.remove(foundUser);
    const { password, role, ...userNoPassword } = foundUser;
    return userNoPassword;
  }
}
