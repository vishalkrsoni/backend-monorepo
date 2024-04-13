import {
  createRedisCacheClient,
  getRedisURL,
  initializeRedisPubSub,
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

const {
  ENV_REDIS,
  REDIS_URL,
  REDIS_PORT,
  REDIS_URL_LOCAL,
  REDIS_PORT_LOCAL,
  REDIS_AUTH,
  REDIS_HOST,
} = process.env;
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

export const redisCacheInstance = createRedisCacheClient(
  getRedisURL(
    ENV_REDIS,
    REDIS_URL,
    REDIS_PORT,
    REDIS_URL_LOCAL,
    REDIS_PORT_LOCAL,
  ),
);

export const redisPubSubInstance = initializeRedisPubSub({
  REDIS_HOST,
  REDIS_AUTH,
  ENV_REDIS,
  REDIS_URL,
  REDIS_PORT,
  REDIS_URL_LOCAL,
  REDIS_PORT_LOCAL,
});
