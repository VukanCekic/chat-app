import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HashService } from './hash.service';
import { UserSchema } from './user.model';
import { UserService } from './user.service';

@Module({
    imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}])],
    controllers: [],
    providers: [UserService, HashService],
})
export class UserModule {}
