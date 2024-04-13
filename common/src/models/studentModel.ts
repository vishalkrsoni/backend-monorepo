import { iStudent } from '@backend-monorepo/common';
import { Schema, model } from 'mongoose';

const studentSchema = new Schema<iStudent>(
  {
    name: { type: String, unique: true },
    rollNum: { type: Number },
    password: { type: String },
    email: { type: String },
    school_id: { type: Schema.Types.ObjectId, ref: 'School' },

    phone: { type: String },
    age: { type: Number },
    className: { type: Schema.Types.ObjectId, ref: 'sclass' },
    school: { type: Schema.Types.ObjectId, ref: 'admin' },
    role: { type: String, default: 'Student' },
    address: { type: String },
    parents: [{ type: Schema.Types.ObjectId, ref: 'Parent' }],
    quizAttended: [{ type: Schema.Types.ObjectId, ref: 'Quiz' }],
    examResult: [
      {
        subName: { type: Schema.Types.ObjectId, ref: 'subject' },
        marksObtained: { type: Number, default: 0 },
      },
    ],
    attendance: [
      {
        date: { type: Date },
        status: { type: String, enum: ['Present', 'Absent'] },
        subName: { type: Schema.Types.ObjectId, ref: 'subject' },
      },
    ],

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

export const Student = model<iStudent>('Student', studentSchema);
