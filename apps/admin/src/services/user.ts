import bcrypt from 'bcrypt';
import { getTimeInIST } from '../utils/timeHelper';
import {
  User,
  iUser,
  logger,
  APIResponse,
  BaseUserService,
  verifyRole,
  publishEventToKafka,
  EventTypes,
  EventMessage,
  getPubSubClient,
  getCacheClient,
  getRedisCacheURL,
  consumeEventsFromKafka,
} from '@backend-monorepo/common';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../utils/accessToken';
import { UserValidator } from '../validators/userValidator';
import {
  cacheClient,
  // kafkaProducer,
  pubSubClient,
} from '../store';

export class UserService extends BaseUserService<iUser> {
  constructor() {
    super(User);
  }

  loginUser = async (body: any) => {
    try {
      const { userName, password, school_id } = body;

      const existingUser = await this.model.findOne({ userName });

      if (!existingUser) return APIResponse.notFound('User does not exist');

      const validPassword = await bcrypt.compare(
        password,
        existingUser.password,
      );

      if (!validPassword) {
        return APIResponse.unauthorized('Invalid password');
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
    } catch (error) {
      logger.error('Error occurred while logging in user:', error);
      return error;
    }
  };

  addSuperAdmin = async (body: any) => {
    try {
      const { userName, password } = body;

      const validationError = UserValidator.validateAddSuperAdmin(body);

      if (validationError) {
        return APIResponse.badRequest(
          `Input validation failed`,
          validationError,
        );
      }

      const exists = await this.model.findOne({ userName });
      if (exists) {
        return APIResponse.conflict(
          `Username ${userName} is already taken.`,
          `userName shall be unique`,
        );
      }

      const newAdminUser = new User({
        ...body,
        password: await bcrypt.hash(password, 10),
      });

      await newAdminUser.save();

      const newEvent: EventMessage = {
        type: 'SUPER_ADMIN_CREATE',
        data: {
          userId: newAdminUser._id,
          name: newAdminUser.name,
          userRoles: newAdminUser.userRoles,
        },
        createdAt: new Date(),
      };

      (await pubSubClient).publish('USER_CREATE', JSON.stringify(newEvent));

      // publishEventToKafka(kafkaProducer, 'USER_CREATE', newEvent);

      return APIResponse.created('Successfully added super admin.', {
        ...newEvent.data,
      });
    } catch (error) {
      logger.error('Error occurred while adding super admin:', error);
      return APIResponse.internalServerError(
        'An error occurred while adding super admin.',
        error,
      );
    }
  };

  private checkPermissionAgainstRoles(
    userRoles: string[],
    requiredRoles: string[],
  ): boolean {
    return requiredRoles.some((role) => userRoles.includes(role));
  }

  private getRequiredRoles(userType: string): string[] {
    switch (userType) {
      case 'Admin':
        return ['SuperAdmin', 'Admin'];
      case 'Teacher':
      case 'Student':
      case 'Parent':
        return ['Admin'];
      default:
        throw new Error(`Invalid userType: ${userType}`);
    }
  }

  registerUser = async (body: any) => {
    try {
      const { userName, password, userType } = body;

      const validationError = UserValidator.validateRegisterUser(body);
      if (validationError) {
        return APIResponse.badRequest(
          `Input validation error`,
          validationError,
        );
      }

      const permission = this.checkPermissionAgainstRoles(
        body.roles,
        this.getRequiredRoles(userType),
      );

      if (!permission) {
        APIResponse.forbidden(
          `User not allowed to add new ${body.userType}`,
          `Insufficient permissions to perform action`,
        );
      }

      const existingUser = await this.model.findOne({ userName });

      if (existingUser) {
        return APIResponse.conflict(
          'Username is already taken',
          `Username shall be unique`,
        );
      }

      const user = new User({
        ...body,
        password: await bcrypt.hash(password, 10),
      });

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
        createdAt: `${Day}-${Time}`,
      };

      logger.info('created event', newEvent);
      return APIResponse.success(`user added of type ${userType}`, {
        user: { ...newEvent.data },
      });
    } catch (error) {
      logger.error(`Error occurred while registering user `, error);
      return APIResponse.internalServerError(
        `Error occurred while registering user `,
        error,
      );
    }
  };

  async getAll() {
    try {
      const data = await this.model
        .find({}, { password: false })
        .populate('userInfo');
      return APIResponse.success('success fetching', data);
    } catch (error) {
      logger.error('Error occurred while fetching users:', error);
      throw APIResponse.internalServerError('Internal server error');
    }
  }
}
