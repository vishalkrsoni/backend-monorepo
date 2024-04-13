import {
  Parent,
  iParent,
  BaseUserService,
  tParent,
  User,
  iUser,
} from '@backend-monorepo/common';

export class UserService extends BaseUserService<iUser> {
  constructor() {
    super(User);
  }

  // async getByUserName(userName: string): Promise<iParent | null> {
  //   try {
  //     return await this.model.findOne({ userName }).exec();
  //   } catch (error) {
  //     throw new Error(
  //       `Error while retrieving parent with username ${userName}: ${error.message}`
  //     );
  //   }
  // }

  // async getByAttribute(attribute: string, value: any): Promise<iParent | null> {
  //   try {
  //     return await this.model.findOne({ [attribute]: value }).exec();
  //   } catch (error) {
  //     throw new Error(
  //       `Error while retrieving parent by attribute ${attribute} with value ${value}: ${error.message}`
  //     );
  //   }
  // }

  // async updateById(id: string, data: any): Promise<iParent | null> {
  //   try {
  //     return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  //   } catch (error) {
  //     throw new Error(
  //       `Error while updating parent with ID ${id}: ${error.message}`
  //     );
  //   }
  // }

  // async deleteById(id: string) {
  //   try {
  //     return await this.model.findByIdAndDelete(id).exec();
  //   } catch (error) {
  //     throw new Error(
  //       `Error while deleting parent with ID ${id}: ${error.message}`
  //     );
  //   }
  // }

  // async getChildrenByParentId(parentId: string): Promise<any[]> {
  //   try {
  //     const parent = await this.model
  //       .findById(parentId)
  //       .populate('students')
  //       .exec();
  //     if (!parent) {
  //       throw new Error(`Parent with ID ${parentId} not found`);
  //     }
  //     return parent.students;
  //   } catch (error) {
  //     throw new Error(
  //       `Error while retrieving children for parent with ID ${parentId}: ${error.message}`
  //     );
  //   }
  // }
}
