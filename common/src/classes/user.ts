import { prop } from '@typegoose/typegoose';
import { Document, Types } from 'mongoose';
import { UserType } from '../types/types';

export class UserClass extends Document {
  @prop({ required: true })
  name: string;

  @prop({ required: true, unique: true })
  userName: string;

  @prop({ required: true })
  password: string;

  @prop({ required: true })
  userType: UserType;

  @prop({})
  userInfo?: Types.ObjectId;
}
