import { Router } from 'express';
import { isAuthentic, verifyRole } from '@backend-monorepo/common';
import { schoolController } from '../store';

export const schoolRouter = Router();

schoolRouter.use(isAuthentic).use(verifyRole('SuperAdmin'));

schoolRouter.post('/school', schoolController.addSchool.bind(schoolController));
schoolRouter.get('/school', schoolController.getAll.bind(schoolController));
schoolRouter.get(
  '/school/:id',
  schoolController.getById.bind(schoolController),
);
schoolRouter.put(
  '/school/:id',
  schoolController.updateById.bind(schoolController),
);
schoolRouter.delete(
  '/school/:id',
  schoolController.deleteById.bind(schoolController),
);
