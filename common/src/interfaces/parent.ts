import { genderType } from '../types/types';
import { Document, Types, Schema } from 'mongoose'

export interface iParent extends Document {
  name: string;
  password: string;
  
  gender: genderType;
  email?: string;
  phone?: string;
  occupation: string;
  dateOfBirth: Date;
  address: string;
  role: string;
  school_id: Types.ObjectId;
  students: Types.ObjectId[];
  isDeleted: boolean;
  // TODO : add fields if needed
}


export type tParent= {
  name: string;
  password: string;
  gender: genderType;
  email?: string;
  phone?: string;
  occupation: string;
  dateOfBirth: Date;
  address: string;
  role: string;
  students: Types.ObjectId[];
  isDeleted: boolean;
  // TODO : add fields if needed
}
