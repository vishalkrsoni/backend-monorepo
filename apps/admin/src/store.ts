

import {
  UserController,
  SchoolController,
  // ClassController,
  // SubjectController,
  // ClassScheduleController,
} from './controllers';

import {
  ClassService,
  UserService,
  SchoolService,
  // SubjectService,

  // ClassScheduleService,
} from './services';

// export const classController = new ClassController();
export const schoolController = new SchoolController();
// export const subjectController = new SubjectController();
// export const studentController = new StudentController();
export const userController = new UserController(new UserService());

export const classService = new ClassService();
export const schoolService = new SchoolService();
// export const parentService = new ParentService();
// export const classScheduleService = new ClassScheduleService();
// export const studentService = new StudentService(parentService);
// export const subjectService = new SubjectService();

// export const parentService = new ParentService();

// export const parentService = new ParentService();

// export const parentController = new ParentController(parentService);

// export const classScheduleController = new ClassScheduleController();

// const redisCache = new RedisCache(
//   getRedisCacheConfig(
//     ENV_REDIS,
//     REDIS_URL,
//     REDIS_PORT,
//     REDIS_URL_LOCAL,
//     REDIS_PORT_LOCAL,
//   ),
// );

// export const redisCacheClient= redisCache.getClient()

// export const redisPubSubInstance = initializeRedisPubSub({
//   REDIS_HOST,
//   REDIS_AUTH,
//   ENV_REDIS,
//   REDIS_URL,
//   REDIS_PORT,
//   REDIS_URL_LOCAL,
//   REDIS_PORT_LOCAL,
// });
