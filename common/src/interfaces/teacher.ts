import { genderType } from '../types/types';
import { iClassSchedule } from './class';
import { Document, Types, Schema } from 'mongoose';

export interface iTeacher extends Document {
  name: string;
  email?: string;
  school_id: Types.ObjectId;
  phone?: string;
  dateOfBirth: Date;
  gender: genderType;
  password: string;
  role: string;
  address: string;
  specialization: string;
  classSchedule: { [className: string]: iClassSchedule };
  subjects: Types.ObjectId[];
  teachSclass: Types.ObjectId;
  attendance: { date: Date; presentCount?: string; absentCount?: string }[];
  isDeleted: boolean;
  // TODO : add fields if needed
}

export type tTeacher = {
  name: string;
  email?: string;
  phone?: string;
  dateOfBirth: Date;
  gender: genderType;
  password: string;
  role: string;
  address: string;
  school: Types.ObjectId;
  specialization: string;
  classSchedule: { [className: string]: iClassSchedule };
  subjects: Types.ObjectId[];
  teachSclass: Types.ObjectId;
  attendance: { date: Date; presentCount?: string; absentCount?: string }[];
  isDeleted: boolean;
  // TODO : add fields if needed
};
