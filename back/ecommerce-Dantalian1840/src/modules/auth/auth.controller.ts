import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuth() {
    return this.authService.getAuth();
  }

  @Post('signin')
  async signIn(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    if (!email || !password) {
      return 'Incorrect Email/Password';
    }
    return this.authService.signIn(email, password);
  }
}
