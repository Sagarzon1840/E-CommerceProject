/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entities/users.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async getUsers(page: number, limit: number) {
    const skip = (page - 1) * limit;
    console.log(page, limit);

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
    if (user) return `User with id ${id} not found`;

    const { password, ...userNoPassword } = user;
    return userNoPassword;
  }
  async findByEmail(email: string) {
    const user = this.usersRepository.findOneBy({ email });
    if (user) {
      return user;
    }
    return null;
  }

  async createUsers(user: Omit<Users, 'id'>) {
    const newUser = await this.usersRepository.save(user);
    const { password, ...userNoPassword } = newUser;
    return userNoPassword;
  }

  async updateUser(id: string, user: Users) {
    const foundUser = await this.usersRepository.findOneBy({ id });
    const { password, ...userNoPassword } = foundUser;
    return userNoPassword;
  }

  async deleteUser(id: string) {
    const foundUser = await this.usersRepository.findOneBy({ id });
    this.usersRepository.remove(foundUser);
    const { password, ...userNoPassword } = foundUser;
    return userNoPassword;
  }
}
