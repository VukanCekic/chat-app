import { Message } from '../user-message/user-message.model';
import { User } from '../user/user.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Room {

  @Prop({ required: true, maxlength: 20, minlength: 5 })
  name: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Message' }] })
  messages: Message[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  connectedUsers: User[];
}

export const RoomSchema = SchemaFactory.createForClass(Room);
