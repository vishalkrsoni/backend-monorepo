import {
  getCacheClient,
  getRedisCacheURL,
  getPubSubClient,
} from '@backend-monorepo/common';
import {
  ClassController,
  SchoolController,
  UserController,
  StudentController,
  ParentController,
  SubjectController,
  ClassScheduleController,
} from './controllers';
import {
  ClassService,
  SchoolService,
  SubjectService,
  UserService,
  ParentService,
  StudentService,
  ClassScheduleService,
} from './services';

export const classService = new ClassService();
export const classController = new ClassController();

export const schoolService = new SchoolService();
export const schoolController = new SchoolController();

export const subjectService = new SubjectService();

export const userController = new UserController(new UserService());

// export const parentService = new ParentService();
export const parentService = new ParentService();
export const studentService = new StudentService(parentService);
export const studentController = new StudentController();

export const parentController = new ParentController(parentService);

export const subjectController = new SubjectController();

export const classScheduleService = new ClassScheduleService();
export const classScheduleController = new ClassScheduleController();

export const redisCacheClient = getCacheClient(getRedisCacheURL());

export const redisPubSubClient = getPubSubClient();
