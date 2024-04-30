import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/dtos/loginUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuth() {
    return this.authService.getAuth();
  }

  @Post('signin')
  async signIn(@Body() loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    if (!email || !password) {
      return 'Incorrect Email/Password';
    }
    return this.authService.signIn(email, password);
  }
}
