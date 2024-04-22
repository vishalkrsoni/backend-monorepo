import {
  Admin,
  Parent,
  logger,
  Student,
  Teacher,
  EventMessage,
  SuperAdmin,
} from '@backend-monorepo/common';

export const handleIncomingRedisEvent = async (event: EventMessage) => {
  let model;

  switch (event.type) {
    case 'STUDENT_CREATE':
      model = Student;
      break;
    case 'PARENT_CREATE':
      model = Parent;
      break;
    case 'ADMIN_CREATE':
      model = Admin;
      break;
    case 'TEACHER_CREATE':
      model = Teacher;
      break;
    case 'SUPER_ADMIN_CREATE':
      model = SuperAdmin;
      break;
    default:
      throw new Error('Invalid user type');
  }

  if (model) {
    try {
      setTimeout(() => {
        console.log('timeout called first');
      }, 1000);

      const user = await model.find()

      logger.debug(`event received for user:`, user);
    } catch (err) {
      throw new Error(err);
    }
  }
};
