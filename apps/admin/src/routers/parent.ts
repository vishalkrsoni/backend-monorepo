import { Router } from 'express';
import { parentController } from '../store';

export const parentRouter = Router();

parentRouter.get('/parents', parentController.getAll.bind(parentController));

parentRouter.get(
  '/parents/attribute',
  parentController.getByAttribute.bind(parentController)
);

parentRouter.get(
  '/parents/:id',
  parentController.getById.bind(parentController)
);
parentRouter.put(
  '/parents/:id',
  parentController.updateById.bind(parentController)
);

parentRouter.delete(
  '/parents/:id',
  parentController.deleteById.bind(parentController)
);
