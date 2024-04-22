import {
  Admin,
  Parent,
  logger,
  Student,
  Teacher,
  EventMessage,
} from '@backend-monorepo/common';

export const handleIncomingRedisEvent = async (event: EventMessage) => {
  let model;

  const { name, userType, userName } = event.data;
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
      model = Admin;
      break;
    default:
      throw new Error('Invalid user type');
  }

  if (model) {
    try {
      await model.create({ name, userName, userType });
      logger.debug(`created new entry for ${userType} : ${userName}`);
    } catch (err) {
      throw new Error(err);
    }
  }
};
