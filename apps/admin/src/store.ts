import {
  getCacheClient,
  getKafkaConsumer,
  getKafkaProducer,
  getNrpConfig,
  getPubSubClient,
  getRedisCacheURL,
} from '@backend-monorepo/common';
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

export const cacheClient = getCacheClient(getRedisCacheURL());

export const pubSubClient = getPubSubClient();

// export const kafkaProducer = getKafkaProducer();

