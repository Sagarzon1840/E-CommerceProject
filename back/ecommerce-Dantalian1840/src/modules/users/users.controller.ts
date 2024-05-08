/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/dtos/userCreation.dto';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(200)
  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async getUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    const pageNumber = page ? Number(page) : 1;
    const limitNumber = limit ? Number(limit) : 5;
    return this.userService.getUsers(pageNumber, limitNumber);
  }

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: CreateUserDto,
  ) {
    const { passwordConfirm, ...userNoPasswordConfirm } = user;
    const foundUser = this.userService.updateUser(id, userNoPasswordConfirm);
    if (!foundUser) throw new NotFoundException(`User with id ${id} not found`);
    return foundUser;
  }

  @HttpCode(200)
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    const foundUser = this.userService.deleteUser(id);
    if (!foundUser) throw new NotFoundException(`User with id ${id} not found`);
    return foundUser;
  }

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Get(':id')
  async getUserById(@Param('id', ParseUUIDPipe) id: string) {
    const foundUser = this.userService.getUserById(id);
    if (!foundUser) throw new NotFoundException(`User with id ${id} not found`);
    return foundUser;
  }
}
