// import { Student, BaseUserService, iStudent } from '@backend-monorepo/common';
// import { ParentService } from './parent';
// import { Types } from 'mongoose';

// export class StudentService extends BaseUserService<iStudent> {
//   private parentService: ParentService;

//   constructor(parentService: ParentService) {
//     super(Student);
//     this.parentService = parentService;
//   }

//   async getByAttribute(attribute: string, value: any) {
//     return await this.model.findOne({ [attribute]: value }).exec();
//   }

//   async updateById(id: string, data: any) {
//     return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
//   }

//   async deleteById(id: string) {
//     await this.model.findByIdAndDelete(id).exec();
//   }

//   async findStudentsByClass(className: string) {
//     return await this.model.find({ class: className });
//   }

//   async findStudentsByAgeRange(minAge: number, maxAge: number) {
//     return await this.model.find({ age: { $gte: minAge, $lte: maxAge } });
//   }

//   async findParentsByStudentId(studentId: string) {
//     const studentWithParentInfo = await this.model
//       .findById(studentId)
//       .populate('parents');

//     if (!studentWithParentInfo) throw new Error('Student not found');

//     const parentIds = studentWithParentInfo.parents.map(
//       (parent: any) => parent._id,
//     );
//     //  why ??
//     await this.parentService.model.find({
//       _id: { $in: parentIds },
//     });

//     console.log(studentWithParentInfo);
//     return studentWithParentInfo.parents;
//   }

//   async addParentByStudentId(studentId: string, parentId: string) {
//     try {
//       const student = await this.model.findById(studentId);
//       const parent = await this.parentService.getById(parentId);
//       if (!student) throw new Error('Student not found');

//       if (!parent) throw new Error('Parent not found');

//       // Convert both parentId and studentId to ObjectId
//       const parentIdObject = new Types.ObjectId(parentId);
//       const studentIdObject = new Types.ObjectId(studentId);

//       // Check if the parent is already associated with the student
//       if (!student.parents.includes(parentIdObject)) {
//         student.parents.push(parentIdObject);
//         await student.save();
//       }

//       // Check if the student is already associated with the parent
//       if (!parent.students.includes(studentIdObject)) {
//         parent.students.push(studentIdObject);
//         await parent.save();
//       }

//       return student;
//     } catch (error) {
//       console.error('Error adding parent:', error.message);
//       throw error;
//     }
//   }
// }
