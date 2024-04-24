import { Injectable } from '@nestjs/common';
import { UsersRepository } from './use.repository';

@Injectable()
export class UserService {
  constructor(private usersRepository: UsersRepository) {}

  getUsers() {
    return this.usersRepository.getUsers();
  }
}
