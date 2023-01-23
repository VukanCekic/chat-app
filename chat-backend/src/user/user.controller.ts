import { Body, Controller, Post } from '@nestjs/common';
import { Delete, Get } from '@nestjs/common/decorators';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async addUser(@Body() body: CreateUserDto): Promise<any> {
    return await this.userService.createUser(body);
  }

  @Post('/login')
  async login(@Body() body: LoginUserDto): Promise<any> {
    return await this.userService.logInUser(body);
  }

  @Delete('/logout')
  async logout(@Body() _id: string): Promise<any> {
    await this.userService.logoutUser(_id);
    return { status: 200 };
  }

  @Get('/rooms')
  rooms(): any {
    return ['arcade', 'dance-hall', 'studio-b', 'traphouse'];
  }
}
