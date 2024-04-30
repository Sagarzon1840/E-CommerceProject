import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { Users } from '../entities/users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(200)
  @Get()
  getUsers(@Query('page') page: number = 1, @Query('limit') limit: number = 5) {
    const pageNumber = page ? Number(page) : 1;
    const limitNumber = limit ? Number(limit) : 5;
    return this.userService.getUsers(pageNumber, limitNumber);
  }

  @HttpCode(201)
  @Post()
  createUser(@Body() user: Users) {
    return this.userService.createUsers(user);
  }

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Put(':id')
  updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() user: Users) {
    return this.userService.updateUser(id, user);
  }

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.deleteUser(id);
  }

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Get(':id')
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.getUserById(id);
  }
}
