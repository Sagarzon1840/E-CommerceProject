import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
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
    return this.authService.signUp(user);
  }

  @HttpCode(201)
  @Post('signin')
  async signIn(@Body() loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    return this.authService.signIn(email, password);
  }
}
