import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class UserService {
    private users: User[] = [];

    constructor(@InjectModel('User') private readonly userModel: Model<User>){}

    public async createUser(userToCreate: User){
        const newUser = await this.userModel.create(userToCreate);
        const result = await newUser.save();
        return result;
    }
}
