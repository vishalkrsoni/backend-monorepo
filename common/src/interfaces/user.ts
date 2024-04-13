import { Types, Document } from 'mongoose';
import { UserType } from '../types/types';

export interface iUser extends Document {
  name: string;
  email?: string;
  school_id: Types.ObjectId;

  phone?: string;
  userName: string;
  password: string;
  userType: UserType;
  userInfo: Types.ObjectId;
  userRoles: string[];
  // TODO : add fields if needed
}

export interface LogOptions {
  level: string;
  filename?: string;
  handleExceptions?: boolean;
  json?: boolean;
  maxSize?: number;
  maxFiles?: number;
  colorize?: boolean;
  // TODO : add fields if needed
}


export interface iAdmin extends Document {
  name: string;
  userName: string;
  email: string;
  userType: string;
  phone: string;
  password: string;
  role: string;
  schoolName: string;
  school_id: Types.ObjectId;

  isDeleted: boolean;
  // TODO : add fields if needed
}



export type tUser = {
  name: string;
  email?: string;
  phone?: string;
  userName: string;
  password: string;
  userType: UserType;
  userInfo: Types.ObjectId;
  userRoles: string[];
  // TODO : add fields if needed
};

export type tLogOptions = {
  level: string;
  filename?: string;
  handleExceptions?: boolean;
  json?: boolean;
  maxSize?: number;
  maxFiles?: number;
  colorize?: boolean;
  // TODO : add fields if needed
};

export type tAdmin = {
  name: string;
  email: string;
  password: string;
  role: string;
  schoolName: string;
  // TODO : add fields if needed
};
