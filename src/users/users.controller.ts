import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(
    @Body() userData: {
      username: string;
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      birthDate: Date;
    },
  ) {
    return this.usersService.create(userData);
  }

  @Get(':username')
  async getUser(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  @Get()
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Patch(':username')
  async updateUser(
    @Param('username') username: string,
    @Body() updateData: Partial<{ email: string; password: string }>,
  ) {
    return this.usersService.update(username, updateData);
  }
}
