import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  private users = [
    {
      id: 1,
      email: 'john@example.com',
      name: 'John Doe',
      password: 'hashedPassword123',
      address: '123 Main St',
      phone: '123-456-7890',
      country: 'USA',
      city: 'New York',
    },
    {
      id: 2,
      email: 'jane@example.com',
      name: 'Jane Smith',
      password: 'hashedPassword456',
      address: '456 Elm St',
      phone: '987-654-3210',
      country: 'Canada',
      city: 'Toronto',
    },
    {
      id: 3,
      email: 'alice@example.com',
      name: 'Alice Johnson',
      password: 'hashedPassword789',
      address: '789 Oak St',
      phone: '555-123-4567',
      country: 'UK',
      city: 'London',
    },
    {
      id: 4,
      email: 'bob@example.com',
      name: 'Bob Smith',
      password: 'hashedPasswordABC',
      address: 'ABC Pine St',
      phone: '333-444-5555',
      country: 'Australia',
      city: 'Sydney',
    },
    {
      id: 5,
      email: 'emily@example.com',
      name: 'Emily Davis',
      password: 'hashedPasswordDEF',
      address: 'DEF Maple St',
      phone: '777-888-9999',
    },
  ];

  async getUsers() {
    return this.users;
  }
}
