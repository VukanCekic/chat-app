import * as mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail';

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true, validate:[isEmail, "Invalid email"]},
  password: { type: String, required: true },
  picture: { type: String },
  newMessages: { type: Object, default: {}},
  status: {type: String, default: 'online'}
}, {minimize: false});

export interface User extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    picture: number;
}