import { Router } from 'express';
import { classScheduleController } from '../store';
import { injectSchoolIdMiddleware, isAuthentic, verifyRole } from '@backend-monorepo/common';

export const classScheduleRouter = Router()
  .use(isAuthentic)
  .use(verifyRole('admin'))
  .use(injectSchoolIdMiddleware);


classScheduleRouter.post(
  '/classSchedule',
  classScheduleController.addClassSchedule.bind(classScheduleController),
);
classScheduleRouter.get(
  '/classSchedule',
  classScheduleController.getAll.bind(classScheduleController),
);

classScheduleRouter.get(
  '/classSchedule/:id',
  classScheduleController.getById.bind(classScheduleController),
);

classScheduleRouter.put(
  '/classSchedule/:id',
  classScheduleController.updateById.bind(classScheduleController),
);

classScheduleRouter.delete(
  '/classSchedule/:id',
  classScheduleController.deleteById.bind(classScheduleController),
);
