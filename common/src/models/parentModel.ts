import { iParent } from '@backend-monorepo/common';
import { Schema, model } from 'mongoose';

const parentSchema = new Schema<iParent>(
  {
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    password: { type: String },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    occupation: { type: String },
    dateOfBirth: { type: Date },
    address: { type: String },
    role: { type: String, default: 'Parent' },
    school_id: { type: Schema.Types.ObjectId, ref: 'School' },
    students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Parent = model<iParent>('Parent', parentSchema);
