import { genderType } from '../types/types';
import { Document, Types, Schema } from 'mongoose'

export interface iStudent extends Document {
  name: string;
  age: number;
  school_id: Types.ObjectId;

  rollNum: number;
  password: string;
  gender: genderType;
  email?: string;
  phone?: string;
  dateOfBirth: Date;
  className: Types.ObjectId;
  school: Types.ObjectId;
  role: string;
  attendance: {
    date: Date;
    status: 'Present' | 'Absent';
    subName: string;
  }[];
  address: string;
  examResult: { subName: Types.ObjectId; marksObtained: number }[];
  parents: Types.ObjectId[];
  quizAttended: iQuiz[];
  isDeleted: boolean;
  // TODO : add fields if needed
}

export interface iQuiz {
  // TODO : Define properties related to a quiz
}

export type tStudent = {
  name: string;
  age: number;

  rollNum: number;
  password: string;
  gender: genderType;
  email?: string;
  phone?: string;
  dateOfBirth: Date;
  className: Types.ObjectId;
  school: Types.ObjectId;
  role: string;
  attendance: {
    date: Date;
    status: 'Present' | 'Absent';
    subName: string;
  }[];
  address: string;
  examResult: { subName: Types.ObjectId; marksObtained: number }[];
  parents: Types.ObjectId[];
  quizAttended: iQuiz[];
  isDeleted: boolean;
  // TODO : add fields if needed
};

export type tQuiz = {
  // TODO : Define properties related to a quiz
};



