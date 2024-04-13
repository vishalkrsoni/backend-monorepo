import { prop, getModelForClass } from '@typegoose/typegoose';
import { Document, Schema, Types } from 'mongoose';
import { iClassSchedule } from '../interfaces/user';
import { genderType } from '../types/types';

type Attendance = {
  date: Date;
  presentCount?: string;
  absentCount?: string;
};

export class TeacherClass extends Document {
  @prop({ required: true })
  name: string;

  @prop()
  email?: string;

  @prop()
  phone?: string;

  @prop({ required: true })
  dateOfBirth: Date;

  @prop({ enum: ['male', 'female', 'other'] })
  gender: genderType;

  @prop({ required: true })
  password: string;

  @prop({ required: true })
  role: string;

  @prop({ required: true })
  address: string;

  @prop({ type: () => [String] })
  subjects: string[];

  @prop()
  specialization: string;

  @prop({ type: Schema.Types.ObjectId, ref: 'admin', required: true })
  school: Types.ObjectId;

  @prop({ type: Schema.Types.ObjectId, ref: 'subject' })
  teachSubject: Types.ObjectId;

  @prop({ type: Schema.Types.ObjectId, ref: 'sclass', required: true })
  teachSclass: Types.ObjectId;

  @prop({ type: [Object] }) // Specify type as array of objects
  attendance: Attendance[];

  @prop({ type: Schema.Types.Mixed }) // Use Mixed type for arbitrary data
  classSchedule: { [className: string]: iClassSchedule };
}
