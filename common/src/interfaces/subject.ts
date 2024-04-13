import { Document, Types, Schema } from 'mongoose'

export interface iSubject extends Document {

  name: string;
  tutor: Schema.Types.ObjectId;
  isDeleted: boolean;
  school_id: Types.ObjectId;
  class_id: Types.ObjectId;

  // TODO : add fields if needed
}

export type tSubject = {
  name: string;
  tutor: Schema.Types.ObjectId;
  isDeleted: boolean;

  // TODO : add fields if needed
};
