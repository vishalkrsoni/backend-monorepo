import { Router } from 'express';
import { subjectController } from '../store';
import { isAuthentic, verifyRole } from '@backend-monorepo/common';

export const subjectRouter = Router();

subjectRouter.use(isAuthentic).use(verifyRole('Admin'));

subjectRouter.post(
  '/subject',
  subjectController.addSubject.bind(subjectController),
);
subjectRouter.get('/subject', subjectController.getAll.bind(subjectController));

subjectRouter.get(
  '/subject/:id',
  subjectController.getById.bind(subjectController),
);

subjectRouter.put(
  '/subject/:id',
  subjectController.updateById.bind(subjectController),
);

subjectRouter.delete(
  '/subject/:id',
  subjectController.deleteById.bind(subjectController),
);
