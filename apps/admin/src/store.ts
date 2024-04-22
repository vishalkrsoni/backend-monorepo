import { UserController, SchoolController } from './controllers';

import { ClassService, UserService, SchoolService } from './services';

export const schoolController = new SchoolController();
export const userController = new UserController(new UserService());

export const classService = new ClassService();
export const schoolService = new SchoolService();
