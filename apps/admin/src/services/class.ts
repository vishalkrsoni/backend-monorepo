import {
  Class,
  BaseUserService,
  iClass,
  APIResponse,
} from '@backend-monorepo/common';
import { Types } from 'mongoose';

export class ClassService extends BaseUserService<iClass> {
  constructor() {
    super(Class);
  }

  async addClass(body: any) {
    console.log('body is:', body);
    try {
      const newClass = await this.model.create({ ...body });
      return newClass
        ? APIResponse.success(`Success adding data`, newClass)
        : APIResponse.expectationFailed(`some error occurred`, newClass);
    } catch (error) {
      return APIResponse.internalServerError(
        `Internal Server Error Occurred. Try later`,
        error,
      );
    }
  }

  async getByAttribute(body: any) {
    try {
      const { attribute, value } = body;
      const data = await this.model.findOne({ [attribute]: value }).exec();
      return APIResponse.success(`Success finding data`, data);
    } catch (error) {
      return APIResponse.internalServerError(
        `Failed to get class by attribute: ${error.message}`,
        error,
      );

      // throw new Error(`Failed to get class by attribute: ${err.message}`);
    }
  }

  async deleteById(id: string) {
    try {
      const data = await this.model.findByIdAndDelete(id).exec();
      return APIResponse.success(`success deleting`, data);
    } catch (err) {
      throw new Error(`Failed to delete class by id: ${err.message}`);
    }
  }

  async addStudentByClassId(studentId: Types.ObjectId, classId: string) {
    try {
      const classObj = await this.model.findById(classId);
      if (!classObj) {
        throw new Error('Class not found');
      }
      classObj.students.push(studentId);
      return await classObj.save();
    } catch (err) {
      throw new Error(`Failed to add student to class: ${err.message}`);
    }
  }

  async getAllStudentsByClassId(id: string) {
    try {
      return await this.model.findById(id).populate('students').exec();
    } catch (err) {
      throw new Error(`Failed to get students for class: ${err.message}`);
    }
  }

  async getAllSubjectsByClassId(classId: string) {
    try {
      const classObj = await this.model
        .findById(classId)
        .populate('subjects')
        .exec();
      return classObj?.subjects.map((subject) => subject) || [];
    } catch (err) {
      throw new Error(`Failed to get subjects for class: ${err.message}`);
    }
  }

  async getClassScheduleByClassId(classId: string): Promise<any> {
    try {
      const classObj = await this.model
        .findById(classId)
        .populate('classSchedule')
        .exec();
      return classObj?.classSchedule || null;
    } catch (err) {
      throw new Error(`Failed to get class schedule for class: ${err.message}`);
    }
  }

  async getClassTeacherByClassId(classId: string) {
    try {
      const classObj = await this.model
        .findById(classId)
        .populate('classTeacher')
        .exec();
      return classObj?.classTeacher || null;
    } catch (err) {
      throw new Error(`Failed to get class teacher for class: ${err.message}`);
    }
  }
}
