import {
  BaseUserService,
  User,
  generateNewError,
  iUser,
} from '@backend-monorepo/common';
import { StatusCodes as HTTPStatusCodes } from 'http-status-codes';
// import User from '../models';
import bcrypt from 'bcrypt';

export class UserService extends BaseUserService<iUser> {
  constructor() {
    super(User);
  }

  registerUser = async (body: any) => {
    try {
      const { name, userName, password, userType, school_id } = body;

      const existingUser = await this.model.findOne({ userName });
      if (existingUser) {
        throw generateNewError(400, 'User already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      // const cachedUser = await redis.get('user');

      const user = new User({
        name,
        school_id,
        userName,
        userType,
        password: hashedPassword,
      });

      // redis.set('user', JSON.stringify(user));
      await user.save();
      return { user };
    } catch (error) {
      throw error instanceof Error
        ? error
        : generateNewError(
            HTTPStatusCodes.INTERNAL_SERVER_ERROR,
            'Internal server error',
            error,
          );
    }
  };

  loginUser = async (userName: string, password: string) => {
    try {
      const user = await this.model.findOne({ userName });

      if (!user)
        throw generateNewError(
          HTTPStatusCodes.NOT_FOUND,
          'User does not exist',
        );

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword)
        throw generateNewError(HTTPStatusCodes.BAD_REQUEST, 'Invalid password');

      return user;
    } catch (error) {
      throw error instanceof Error
        ? error
        : generateNewError(
            HTTPStatusCodes.INTERNAL_SERVER_ERROR,
            'Internal server error',
            error,
          );
    }
  };
  async getAll(): Promise<any[]> {
    try {
      return await this.model
        .find()
        .populate(
          'userInfo',
          '-_id -name -userName -userType -createdAt -updatedAt -__v',
        );
    } catch (error) {
      console.error('Error occurred while fetching users:', error);
      throw new Error(error);
    }
  }
}

// Uncomment and implement other methods if needed, following similar patterns

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
