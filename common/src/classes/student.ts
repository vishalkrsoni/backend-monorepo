import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { Document, Schema } from 'mongoose';

type SubjectRef = string;

export class StudentClass extends Document {
  @prop({ required: true })
  name: string;

  @prop({ required: true })
  rollNum: number;

  @prop({ required: true })
  password: string;

  @prop({ enum: ['male', 'female', 'other'] })
  gender: string;

  @prop()
  email?: string;

  @prop()
  phone?: string;

  @prop({ required: true })
  dateOfBirth: Date;

  @prop({ ref: () => 'sclass', required: true })
  className: Ref<'sclass'>;

  @prop({ ref: () => 'admin', required: true })
  school: Ref<'admin'>;

  @prop({ required: true })
  role: string;

  // @prop({
  //   type: [{ subName: { type: Schema.Types.ObjectId, ref: 'subject' }, marksObtained: Number }],
  // })
  // examResult: { subName: SubjectRef; marksObtained: number }[];

  @prop({
    type: [
      {
        date: { type: Date, required: true },
        status: { type: String, enum: ['Present', 'Absent'], required: true },
        subName: {
          type: Schema.Types.ObjectId,
          ref: 'subject',
          required: true,
        },
      },
    ],
  })
  attendance: {
    date: Date;
    status: 'Present' | 'Absent';
    subName: SubjectRef;
  }[];

  @prop({ required: true })
  address: string;

  @prop({ type: [{ type: Schema.Types.ObjectId, ref: 'parent' }] })
  parents: Ref<'parent'>[];
}
