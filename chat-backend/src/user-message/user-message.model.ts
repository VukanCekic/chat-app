import { User } from '../user/user.model';
import { ObjectID } from 'bson';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

type CustomUser = Omit<User, 'password' | 'name' | 'email'>;

@Schema()
export class Message {
  _id: ObjectID | string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true, type: Object })
  from: CustomUser;

  @Prop({ required: false })
  socketid: string;

  @Prop({ required: false })
  time: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  to: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
