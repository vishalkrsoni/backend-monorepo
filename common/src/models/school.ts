import { Schema, model, Document, Types } from 'mongoose';
import { iSchool } from '../interfaces';

const SchoolSchema = new Schema<iSchool>({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  address: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
});

export const School = model<iSchool>('School', SchoolSchema);
