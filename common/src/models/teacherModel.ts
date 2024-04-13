import { iTeacher } from '@backend-monorepo/common';
import { Document, Schema, model } from 'mongoose';

const teacherSchema = new Schema<iTeacher>(
  {
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    school_id: { type: Schema.Types.ObjectId, ref: 'School' },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    password: { type: String },
    role: { type: String },
    address: { type: String },
    subjects: [{ type: Schema.Types.ObjectId, ref: 'Subject' }],
    specialization: { type: String },
    classSchedule: { type: Schema.Types.ObjectId, ref: 'ClassSchedule' },
    teachSclass: { type: Schema.Types.ObjectId, ref: 'Class' },
    attendance: [
      {
        date: { type: Date },
        presentCount: { type: String },
        absentCount: { type: String },
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

export const Teacher = model<iTeacher>('Teacher', teacherSchema);
