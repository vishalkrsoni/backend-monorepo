import { Teacher, BaseUserService, iTeacher } from '@backend-monorepo/common';

export class TeacherService extends BaseUserService<iTeacher> {
  constructor() {
    super(Teacher);
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

  async findTeachersBySubject(subject: string) {
    return await this.model.find({ subjects: subject });
  }

  // Implement other required methods as needed
}
