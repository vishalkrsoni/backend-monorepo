import { Document, Schema, model } from 'mongoose';
import { iSubject } from '../interfaces/subject';

const subjectSchema = new Schema<iSubject>(
  {
    name: { type: String, required: true, unique: true },
    tutor: {
      type: Schema.Types.ObjectId,
      ref: 'Teacher',
    },
    school_id: { type: Schema.Types.ObjectId, ref: 'School' },
    class_id: { type: Schema.Types.ObjectId, ref: 'Class' },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

export const Subject = model<iSubject>('Subject', subjectSchema);
