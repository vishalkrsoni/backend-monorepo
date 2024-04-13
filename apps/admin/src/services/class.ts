import { Class, BaseUserService, iClass } from '@backend-monorepo/common';
import { Types } from 'mongoose';

export class ClassService extends BaseUserService<iClass> {
  constructor() {
    super(Class);
  }

  async addClass(className: string) {
    try {
      const newClass = await this.model.create({ name: className });
      return newClass;
    } catch (err) {
      throw new Error(`Failed to add class: ${err.message}`);
    }
  }

  async getByAttribute(attribute: string, value: any) {
    try {
      const result = await this.model.findOne({ [attribute]: value }).exec();
      return result;
    } catch (err) {
      throw new Error(`Failed to get class by attribute: ${err.message}`);
    }
  }

  async updateById(id: string, data: Partial<iClass>) {
    try {
      const updatedClass = await this.model
        .findByIdAndUpdate(id, data, { new: true })
        .exec();
      return updatedClass;
    } catch (err) {
      throw new Error(`Failed to update class by id: ${err.message}`);
    }
  }

  async deleteById(id: string) {
    try {
      await this.model.findByIdAndDelete(id).exec();
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
