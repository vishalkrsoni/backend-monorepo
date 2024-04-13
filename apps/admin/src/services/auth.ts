// import User from '../models';
import bcrypt from 'bcrypt';
import {
  User,
  generateNewError,
  logger,
  scheduleCronJob,
} from '@backend-monorepo/common';
import { StatusCodes as HTTPStatusCodes } from 'http-status-codes';

export const registerUser = async (
  name: string,
  userName: string,
  password: string,
  userType: string,
  age?: number
) => {
  try {
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      throw generateNewError(400, 'User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // const cachedUser = await redis.get('user');

    const user = new User({
      name,
      age,
      userName,
      userType,
      password: hashedPassword,
    });

    await user.save();

    // redis.set('user', JSON.stringify(user));

    const cronTask = async () => {
      console.info('executing cron job at ', new Date(Date.now()));
    };
    console.info('user name ', user.name);

    console.info('user ', user);

    const cronJobEvery2Seconds = scheduleCronJob('*/3 * * * * *', cronTask);
    setTimeout(() => {
      cronJobEvery2Seconds.stop();
      logger.info('Cron job stopped successfully');
    }, 12001);

    return { user };
  } catch (error) {
    throw error instanceof Error
      ? error
      : generateNewError(
          HTTPStatusCodes.INTERNAL_SERVER_ERROR,
          'Internal server error',
          error
        );
  }
};

export const loginUser = async (userName: string, password: string) => {
  try {
    const user = await User.findOne({ userName });
    if (!user)
      throw generateNewError(HTTPStatusCodes.NOT_FOUND, 'User does not exist');

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
          error
        );
  }
};
