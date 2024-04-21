import { s3Client } from '@backend-monorepo/common';
import { UserController } from './controllers/user';
import { AwsService } from './services/aws';
import { UserService } from './services/user';
import { AwsController } from './controllers/aws';

const userService = new UserService();
export const userController = new UserController(userService);

export const awsService = new AwsService(s3Client);

export const awsController = new AwsController();
