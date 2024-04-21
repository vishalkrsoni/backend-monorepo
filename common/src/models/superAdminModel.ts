import { model, Schema, Types } from 'mongoose';
import { iSuperAdmin } from '../interfaces';

const superAdminSchema = new Schema<iSuperAdmin>(
  {
    name: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    userType: {
      type: String,
      required: true,
    },
    school_id: {
      type: Schema.Types.ObjectId,
      ref: 'School',
    },
    userInfo: {
      type: Schema.Types.ObjectId,
      ref: 'SuperAdmin',
    },
    email: {
      type: String,
      // required: true,
    },
    password: {
      type: String,
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      default: 'SuperAdmin',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true },
);
export const SuperAdmin = model<iSuperAdmin>('SuperAdmin', superAdminSchema);
