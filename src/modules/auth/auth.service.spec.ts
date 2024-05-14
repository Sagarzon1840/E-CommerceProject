import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service';
import { Users } from '../entities/users.entity';

it('Create an instance of AuthService', async () => {
  const mockUsersService: Partial<UserService> = {
    findByEmail: () => Promise.resolve(undefined),
    createUsers: (user: Partial<Users>): Promise<Users> =>
      Promise.resolve({
        ...user,
        id: 'eb4e3677-97af-49d4-93e7-a510f6186c2e',
        email: 'true312aadpmino@example.com',
        name: 'Admin Real',
        address: '123 Main St',
        phone: 1234567890,
        country: 'Ensd',
        city: 'Manchester',
        role: 1,
        orders: [],
        password: 'HashedTdhing12!',
      }),
  };

  const module = await Test.createTestingModule({
    providers: [
      AuthService,
      JwtService,
      { provide: UserService, useValue: mockUsersService },
    ],
  }).compile();

  const authService = module.get<AuthService>(AuthService);
  expect(authService).toBeDefined();
});
