import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  addUser(@Body() body: CreateUserDto): any {
    return this.userService.createUser(body);
  }

  @Post('/login')
  login(@Body() body: LoginUserDto): any {
    return this.userService.logInUser(body);
  }
}
