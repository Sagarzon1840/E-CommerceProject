import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/dtos/userCreation.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from './roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async getAuth() {
    return 'Auth Service!';
  }

  async signUp(user: CreateUserDto) {
    const { passwordConfirm, ...userNoPasswordConfirm } = user;

    const foundUser = await this.userService.findByEmail(user.email);
    if (foundUser) {
      throw new BadRequestException('Email already exist');
    }

    if (passwordConfirm !== userNoPasswordConfirm.password) {
      throw new BadRequestException('Passwords dont match');
    }

    const hashedPassword = await bcrypt.hash(
      userNoPasswordConfirm.password,
      10,
    );
    if (!hashedPassword) {
      throw new BadRequestException('Password could not be hashed');
    }
    const dbUser = await this.userService.createUsers({
      ...userNoPasswordConfirm,
      password: hashedPassword,
    });

    if (!dbUser) throw new BadRequestException('User could not be created');

    return dbUser;
  }

  async signIn(email: string, password: string) {
    const foundUser = await this.userService.findByEmail(email);
    const isPasswordValid = await bcrypt.compare(password, foundUser.password);

    if (!foundUser || !isPasswordValid)
      throw new BadRequestException('Incorrect credentials');

    const userPayload = {
      sub: foundUser.id,
      id: foundUser.id,
      email: foundUser.email,
      roles: [foundUser.isAdmin ? Role.Admin : Role.User],
    };
    const token = this.jwtService.sign(userPayload);
    return { success: 'Successful Login', token };
  }
}
