import { genderType } from '../types/types';
import { Document, Types, Schema } from 'mongoose';

export interface iSchool extends Document {
  name: string;
  email?: string;
  phone?: string;
  address: string;
  isDeleted: boolean;
  // TODO : add fields if needed
}

export type tSchool = {
  name: string;
  email?: string;
  phone?: string;
  address: string;
  isDeleted: boolean;
  // TODO : add fields if needed
};

