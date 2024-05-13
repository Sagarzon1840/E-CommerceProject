import {
  BadGatewayException,
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dtos/userCreation.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from 'src/dtos/loginUser.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuth() {
    return this.authService.getAuth();
  }

  @HttpCode(201)
  @Post('signup')
  async signUp(@Body() user: CreateUserDto) {
    const signUp = this.authService.signUp(user);
    if (!signUp) throw new BadRequestException('Sign up error');
    return signUp;
  }

  @HttpCode(201)
  @Post('signin')
  async signIn(@Body() loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const signIn = this.authService.signIn(email, password);
    if (!signIn) throw new BadGatewayException('Sign in error');
    return signIn;
  }
}
