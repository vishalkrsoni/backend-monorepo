import express from 'express';
import { TeacherController } from '../controllers/teacher';
import { TeacherService } from '../services/teacher';

export const teacherRouter = express.Router();

const teacherService = new TeacherService();

const teacherController = new TeacherController(teacherService);

teacherRouter.get(
  '/teachers',
  teacherController.getAll.bind(teacherController)
);
teacherRouter.get(
  '/teachers/find',
  teacherController.findTeachersBySubject.bind(teacherController)
);

teacherRouter.get(
  '/teachers/:id',
  teacherController.getById.bind(teacherController)
);

teacherRouter.put(
  '/teachers/:id',
  teacherController.updateById.bind(teacherController)
);
teacherRouter.delete(
  '/teachers/:id',
  teacherController.deleteById.bind(teacherController)
);
