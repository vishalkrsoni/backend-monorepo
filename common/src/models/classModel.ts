import { Document, Schema, model, Types } from 'mongoose';
import { iClass } from '../interfaces/class';

const classSchema = new Schema<iClass>(
  {
    name: { type: String },
    classTeacher: {
      type: Schema.Types.ObjectId,
      ref: 'Teacher',
    },
    subjects: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Subject',
      },
    ],
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Student',
      },
    ],
    classSchedule: {
      type: Schema.Types.ObjectId,
      ref: 'ClassSchedule',
    },
    school_id: {
      type: Schema.Types.ObjectId,
      ref: 'School',
    },

    // TODO : add fields if needed

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

export const Class = model<iClass>('Class', classSchema);
