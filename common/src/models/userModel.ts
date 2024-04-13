import {
  Admin,
  Parent,
  Student,
  Teacher,
  iUser,
  logger,
} from '@backend-monorepo/common';
import { Schema, model, Types } from 'mongoose';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: { type: String },
    phone: { type: String },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
      enum: ['Student', 'Admin', 'Parent', 'Teacher'],
    },
    userRoles: [
      {
        type: String,
      },
    ],
    userInfo: {
      type: Types.ObjectId,
      refPath: 'userType',
    },
    school_id: {
      type: Types.ObjectId,
      ref: 'School',
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  try {
    const { name, userType, userName } = this;

    let model;
    switch (userType) {
      case 'Student':
        model = Student;
        break;
      case 'Parent':
        model = Parent;
        break;
      case 'Admin':
        // case 'super-admin':
        model = Admin;
        break;
      case 'Teacher':
        model = Teacher;
        break;
      default:
        throw new Error('Invalid user type');
    }

    const newUser = await model.create({ name, userName, userType });
    this.userInfo = newUser._id;
    logger.debug(`Created new entry for ${userType}: ${userName}`);

    this.set('userRoles', [userType]);

    next();
  } catch (error) {
    console.error('Error in pre-save hook:', error);
    next(error);
  }
});

export const User = model<iUser>('User', UserSchema);
