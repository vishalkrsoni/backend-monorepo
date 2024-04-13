import { School, BaseUserService, iSchool } from '@backend-monorepo/common';
import { Types } from 'mongoose';

export class SchoolService extends BaseUserService<iSchool> {
  constructor() {
    super(School);
  }

  async addSchool(schoolName: string, address: string) {
    try {
      return await this.model.create({ name: schoolName, address });
    } catch (err) {
      throw new Error(err);
    }
  }

  async getByAttribute(attribute: string, value: any) {
    return await this.model.findOne({ [attribute]: value }).exec();
  }

  async updateById(id: string, data: Partial<iSchool>) {
    return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async deleteById(id: string) {
    await this.model.findByIdAndDelete(id).exec();
  }
}
