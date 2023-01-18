import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesGateway } from './gateway/chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { UserModule } from './user/user.module';
import { Message, MessageSchema } from './user-message/user-message.model';
import { Room, RoomSchema } from './user-room/user-room.model';
import { User, UserSchema } from './user/user.model';
dotenv.config();
@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.pkdbv7t.mongodb.net/chat?retryWrites=true&w=majority`,
    ),
    UserModule,
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      { name: Room.name, schema: RoomSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, MessagesGateway],
})
export class AppModule {}
