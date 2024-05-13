import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from './userCreation.dto';

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}
