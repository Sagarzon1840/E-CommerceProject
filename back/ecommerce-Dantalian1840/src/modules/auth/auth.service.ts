import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async getAuth() {
    return 'Auth Service!';
  }
  async signIn(email: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });
    if (!user || user.password !== password) return 'Incorrect credentials';

    return 'Successful Login';
  }
}
