import express, { Router } from 'express';
import { TeacherController } from '../controllers/teacher';
import { TeacherService } from '../services/teacher';
import {
  injectSchoolIdMiddleware,
  verifyRole,
  isAuthentic,
} from '@backend-monorepo/common';

export const teacherRouter = Router()
  .use(isAuthentic)
  .use(verifyRole('Admin'))
  .use(injectSchoolIdMiddleware);

const teacherService = new TeacherService();

const teacherController = new TeacherController(teacherService);

teacherRouter.get(
  '/teachers',
  teacherController.getAll.bind(teacherController),
);
teacherRouter.get(
  '/teachers/find',
  teacherController.findTeachersBySubject.bind(teacherController),
);

teacherRouter.get(
  '/teachers/:id',
  teacherController.getById.bind(teacherController),
);

teacherRouter.put(
  '/teachers/:id',
  teacherController.updateById.bind(teacherController),
);
teacherRouter.delete(
  '/teachers/:id',
  teacherController.deleteById.bind(teacherController),
);
