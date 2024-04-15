import bcrypt from 'bcrypt';
import { getTimeInIST } from '../utils/timeHelper';
import { StatusCodes as HTTPStatusCodes } from 'http-status-codes';
import {
  User,
  iUser,
  logger,
  BaseUserService,
  generateNewError,
  verifyRole,
} from '@backend-monorepo/common';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../utils/accessToken';

export class UserService extends BaseUserService<iUser> {
  constructor() {
    super(User);
  }

  addSuperAdmin = async (body: any) => {
    try {
      const exists = await this.model.findOne({
        userName: body.userName,
      });
      if (exists) {
        throw generateNewError(400, `Username is taken`);
      }
      const newAdminUser = new User({
        ...body,
        password: await bcrypt.hash(body.password, 10),
      });

      const newEvent = {
        type: 'SUPER_ADMIN_CREATE',
        data: {
          userId: newAdminUser._id,
          name: newAdminUser.name,
          userType: body.userType,
          userRoles: newAdminUser.userRoles,
        },
        createdAt: new Date(Date.now()),
      };
      return { user: newEvent };
    } catch (err) {
      console.log(err);
    }
  };

  registerUser = async (body: any) => {
    try {
      const { userName, password, userType, school_id } = body;

      const existingUser = await this.model.findOne({ userName });
      if (existingUser) {
        throw generateNewError(400, `Username is already taken`);
      }

      // const cachedUser = await redis.get('user');

      const user = new User({
        ...body,
        password: await bcrypt.hash(password, 10),
      });

      // redis.set('user', JSON.stringify(user));

      await user.save();

      const eventType = userType.toUpperCase() + '_CREATE';
      const { Time, Day } = getTimeInIST(new Date(Date.now()));
      const newEvent = {
        type: eventType,
        data: {
          ...body,
          userId: user._id,
          userRoles: user.userRoles,
        },
        createdAt: `{Time} : {Day}`,
      };

      logger.info('created event', newEvent);
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

  loginUser = async (body: any) => {
    try {
      const { userName, password, school_id } = body;

      const existingUser = await this.model.findOne({ userName });

      if (!existingUser)
        throw generateNewError(
          HTTPStatusCodes.NOT_FOUND,
          'User does not exist',
        );

      const validPassword = await bcrypt.compare(
        password,
        existingUser.password,
      );

      if (!validPassword) {
        throw generateNewError(
          HTTPStatusCodes.BAD_REQUEST,
          'Invalid password: please provide a valid password',
        );
      }

      const userInfo = {
        userId: existingUser._id,
        name: existingUser.name,
        userName: existingUser.userName,
        school: existingUser.school_id,
        roles: existingUser.userRoles,
        loginAt: getTimeInIST(new Date(Date.now())),
      };

      return {
        userInfo,
        tokens: {
          accessToken: generateAccessToken(userInfo),
          refreshToken: generateRefreshToken(userInfo),
        },
      };

      // const newEvent = {
      //   type: 'USER_LOGGED',
      //   data: user,
      //   createdAt: new Date(Date.now()),
      // };

      // // Sending event to kafka
      // await sendToKafka('USER_CREATE', JSON.stringify(newEvent));
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
        .find({}, { password: false })
        .populate('userInfo');
    } catch (error) {
      console.error('Error occurred while fetching users:', error);
      throw new Error(error);
    }
  }
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
