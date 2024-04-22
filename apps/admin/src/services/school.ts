import {
  School,
  BaseUserService,
  iSchool,
  APIResponse,
} from '@backend-monorepo/common';
import { Types } from 'mongoose';

export class SchoolService extends BaseUserService<iSchool> {
  constructor() {
    super(School);
  }

  async addSchool(schoolName: string, address: string) {
    try {
      const newSchool = await this.model.create({ name: schoolName, address });
      return APIResponse.created(`added new school success`, newSchool);
    } catch (err) {
      return APIResponse.internalServerError(`error adding school`, err);
    }
  }

  // async getByAttribute(attribute: string, value: any) {
  //   return await this.model.findOne({ [attribute]: value }).exec();
  // }

  // async updateById(id: string, data: Partial<iSchool>) {
  //   return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  // }

  // async deleteById(id: string) {
  //   await this.model.findByIdAndDelete(id).exec();
  // }
}
