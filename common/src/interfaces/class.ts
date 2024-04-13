import { iStudent, tStudent } from './student';
import { iTeacher, tTeacher } from './teacher';
import { iAdmin, iUser, tAdmin, tUser } from './user';
import { iSubject, tSubject } from './subject';
import { iParent, tParent } from './parent';
import { Document, Types, Schema } from 'mongoose';

interface iSubjectSchedule {
  subject: string;
  timing: string;
  teacher: string;
}

export interface iClassSchedule extends Document {
  className: string;
  classSchedule: iSubjectSchedule[];
  class_id: Types.ObjectId;
  school_id: Types.ObjectId;
  isDeleted: boolean;
  // TODO: add fields if needed
}

export interface iClass extends Document {
  name: string;
  school_id: Types.ObjectId;
  classTeacher: Types.ObjectId;
  classSchedule: Types.ObjectId;
  students: Types.ObjectId[];
  subjects: Types.ObjectId[];
  isDeleted: boolean;
  // TODO: add fields if needed
}

type tSubjectSchedule = {
  subject: string;
  timing: string;
  teacher: string;
};

export type tClassSchedule = {
  className: string;
  schedule: tSubjectSchedule[];
  isDeleted: boolean;
  // TODO : add fields if needed
};

export type tClass = {
  name: string;
  school_id: Types.ObjectId;
  
  classTeacher: Types.ObjectId;
  classSchedule: Types.ObjectId;
  students: Types.ObjectId[];
  subjects: Types.ObjectId[];
  isDeleted: boolean;
  // TODO : add fields if needed
};

export type tBaseService =
  | tClass
  | tParent
  | tAdmin
  | tStudent
  | tSubject
  | tTeacher
  | tUser;

export interface iBaseService extends Document {
  admin?: iAdmin;
  class?: iClass;
  parent?: iParent;
  student?: iStudent;
  subject?: iSubject;
  teacher?: iTeacher;
  user?: iUser;
}
