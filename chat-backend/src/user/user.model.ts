import { ObjectID } from 'bson';
import { Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import isEmail from 'validator/lib/isEmail';
import { Message } from 'src/user-message/user-message.model';
import { Room } from 'src/user-room/user-room.model';
import { v4 as uuidv4 } from 'uuid';

@Schema()
export class User {
  _id?: ObjectID | string;

  @Prop({ required: true, maxlength: 20, minlength: 5, unique: true })
  name: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    index: true,
    validate: [isEmail, 'Invalid email'],
  })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, type: String })
  picture: string;

  @Prop({ required: true, type: String, default: 'online' })
  status: string;

  @Prop({ required: false, default: null })
  clientId: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Message' }] })
  messages?: Message[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Room' }] })
  joinedRooms?: Room[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};
