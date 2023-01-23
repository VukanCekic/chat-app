import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { HashService } from './hash.service';
import { User } from './user.model';

@Injectable()
export class UserService {
  private users: User[] = [];

  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly hashService: HashService,
  ) {}

  public async createUser(userToCreate: CreateUserDto) {
    const exists = await this.userModel.find({
      $or: [{ email: userToCreate.email }, { name: userToCreate.name }],
    });

    if (exists[0])
      throw new HttpException(
        'Email or Name already exists',
        HttpStatus.BAD_REQUEST,
      );

    const newUser = await this.userModel.create(userToCreate);
    newUser.password = await this.hashService.hashPassword(newUser.password);
    newUser.clientId = null;

    const result = await newUser.save();
    return result;
  }

  public async logInUser(userToLogin: LoginUserDto) {
    const user = await this.findOne(userToLogin.email);

    const isMatch = await await this.hashService.comparePassword(
      userToLogin.password,
      user.password,
    );
    if (!isMatch)
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.BAD_REQUEST,
      );

    user.status = 'online';

    await user.save();
    return user;
  }

  public async logoutUser(_id: string): Promise<void> {
    const user = await this.userModel.findById(_id);
    user.status = 'offline';
    user.clientId = null;
    await user.save();
  }

  private async findOne(email: string) {
    const user = await this.userModel.findOne({ email: email });
    if (!user)
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.BAD_REQUEST,
      );

    return user;
  }
}
