import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService){

    }
    
    @Post("/create")
    addUser(@Body() body: User): any{
      this.userService.createUser(body);
    }

    @Post("/login")
    login(@Body()): any{
      return {};
    }
}
