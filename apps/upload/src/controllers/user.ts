import { BaseController } from '@backend-monorepo/common';
import { UserService } from '../services/user';

export class UserController extends BaseController<UserService> {}
