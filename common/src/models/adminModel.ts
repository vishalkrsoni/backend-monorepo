import { model, Schema, Types } from 'mongoose';
import { iAdmin } from '../interfaces';

const adminSchema = new Schema<iAdmin>(
  {
    name: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    school_id: {
      type: Schema.Types.ObjectId,
      ref: 'School',
    },
    userInfo: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
    email: {
      type: String,
      // unique: true,
      // required: true,
    },
    password: {
      type: String,
      // required: true,
    },
    phone: {
      type: String,
      // required: true,
    },
    role: {
      type: String,
      default: 'Admin',
    },
    schoolName: {
      type: String,
      // unique: true,
      // required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true },
);
export const Admin = model<iAdmin>('Admin', adminSchema);
