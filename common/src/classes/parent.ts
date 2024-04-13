import { prop } from '@typegoose/typegoose';
import { Document, Schema, Types } from 'mongoose';
import { genderType } from '../types/types';

export class ParentClass extends Document {
  @prop({ required: true })
  name: string;

  @prop({ required: true })
  password: string;

  @prop({ enum: ['male', 'female', 'other'] })
  gender: genderType;

  @prop()
  email?: string;

  @prop()
  phone?: string;

  @prop({ required: true })
  occupation: string;

  @prop({ required: true })
  dateOfBirth: Date;

  @prop({ required: true })
  address: string;

  @prop({ required: true, default: 'Parent' })
  role: string;

  @prop({ type: [{ type: Schema.Types.ObjectId, ref: 'student' }] })
  students: Types.ObjectId[];
}
