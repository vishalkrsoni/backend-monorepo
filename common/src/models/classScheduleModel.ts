import { Document, Schema, model, Types } from 'mongoose';
import { iClassSchedule } from '../interfaces/class';

const classScheduleSchema = new Schema<iClassSchedule>(
  {
    className: { type: String, required: true, unique: true },
    classSchedule: [
      {
        subject: { type: String },
        timing: { type: String },
        teacher: { type: String },
      },
    ],
    class_id: {
      type: Schema.Types.ObjectId,
      ref: 'Class', // Reference to the School model
    },
    school_id: {
      type: Schema.Types.ObjectId,
      ref: 'School', // Reference to the School model
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const ClassSchedule = model<iClassSchedule>(
  'ClassSchedule',
  classScheduleSchema
);
