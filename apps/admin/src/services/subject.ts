import { Subject, BaseUserService, iSubject } from '@backend-monorepo/common';

export class SubjectService extends BaseUserService<iSubject> {
  constructor() {
    super(Subject);
  }

  async addSubject(subjectName: string) {
    try {
      return await this.model.create({ name: subjectName });
    } catch (err) {
      throw new Error(err);
    }
  }

  async getByAttribute(attribute: string, value: any) {
    return await this.model.findOne({ [attribute]: value }).exec();
  }

  async updateById(id: string, data: any) {
    return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async deleteById(id: string) {
    await this.model.findByIdAndDelete(id).exec();
  }
}
