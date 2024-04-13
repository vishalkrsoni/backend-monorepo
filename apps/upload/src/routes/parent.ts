import express from 'express';
import { ParentController } from '../controllers/parent';
import { ParentService } from '../services/parent';

export const parentRouter = express.Router();

const parentController = new ParentController(new ParentService());

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
