import { Document, Schema, model } from 'mongoose';
import { iSchool } from '../interfaces';


const schoolSchema = new Schema<iSchool>(
  {

    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    address: { type: String, required: true },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

export const School = model<iSchool>('School', schoolSchema);
