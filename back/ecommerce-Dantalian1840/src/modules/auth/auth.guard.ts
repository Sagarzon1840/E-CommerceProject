import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return false;
    }
    const authParts = authHeader.split(' ');
    if (authParts.length !== 2 || authParts[0] !== 'Basic') {
      return false;
    }

    const [email, password] = authParts.split(':');
    if (!email || !password) return false;
    return true;
  }
}
