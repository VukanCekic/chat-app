// export class createUserDto {
//   name: string;
//   email: string;
//   password: string;
//   picture: string;
//   newMessages: object;
//   status: string;
// }
import { IsEmail, IsNotEmpty, IsString, isString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  picture: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
