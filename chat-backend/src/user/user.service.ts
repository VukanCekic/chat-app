import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HashService } from './hash.service';
import { User } from './user.model';

@Injectable()
export class UserService {
    private users: User[] = [];

    constructor(@InjectModel('User') private readonly userModel: Model<User>, private readonly hashService: HashService){}

    public async createUser(userToCreate: User){

        const newUser = await this.userModel.create(userToCreate);
        newUser.password = await this.hashService.hashPassword(newUser.password);

        const result = await newUser.save();
        return result;
    }

    public async logInUser(email: string, password: string){
        const user = await this.findOne(email);

        const isMatch = await  await this.hashService.comparePassword(password,user.password);
        if(!isMatch) throw new Error('Invalid email or password');

        user.status = 'online';
        
        await user.save();
        return user;
    }

    private async findOne(email: string){

        const user = await this.userModel.findOne({email: email })
        if(!user) throw new Error('Invalid email or password');

        return user;
    }
}
