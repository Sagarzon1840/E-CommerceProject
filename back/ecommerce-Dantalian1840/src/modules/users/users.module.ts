import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './use.repository';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UserService, UsersRepository],
})
export class UsersModule {}
