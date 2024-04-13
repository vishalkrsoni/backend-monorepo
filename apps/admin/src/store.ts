import {
  createRedisCacheClient,
  getRedisURL,
  initializeRedisPubSub,
} from '@backend-monorepo/common';
import { ClassController } from './controllers/class';
import { ClassScheduleController } from './controllers/classSchedule';
import { SubjectController } from './controllers/subject';
import { ClassService } from './services/class';
import { ClassScheduleService } from './services/classSchedule';
import { SubjectService } from './services/subject';
import { SchoolService } from './services/school';
import { SchoolController } from './controllers/school';
import { StudentService } from './services/student';
import { ParentService } from './services/parent';
import { ParentController } from './controllers/parent';
import { StudentController } from './controllers/student';
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
