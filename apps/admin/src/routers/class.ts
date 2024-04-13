import { Router } from 'express';
import { classController } from '../store';
import { injectSchoolIdMiddleware, isAuthentic, verifyRole } from '@backend-monorepo/common';

export const classRouter = Router();

classRouter.use(isAuthentic).use(verifyRole('admin'))
.use(injectSchoolIdMiddleware);

classRouter.post('/class', classController.addClass.bind(classController));
classRouter.get('/class', classController.getAll.bind(classController));
classRouter.get('/class/:id', classController.getById.bind(classController));
classRouter.put('/class/:id', classController.updateById.bind(classController));
classRouter.delete(
  '/class/:id',
  classController.deleteById.bind(classController),
);
