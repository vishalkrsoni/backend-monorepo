// import {
//   BaseUserService,
//   ClassSchedule,
//   iClassSchedule,
// } from '@backend-monorepo/common';

// export class ClassScheduleService extends BaseUserService<iClassSchedule> {
//   constructor() {
//     super(ClassSchedule);
//   }

//   async addClassSchedule(className: string, classSchedule: string) {
//     try {
//       return await this.model.create({ className, classSchedule });
//     } catch (err) {
//       throw new Error(err);
//     }
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
// }
