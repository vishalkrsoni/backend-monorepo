import express from 'express';
import { ParentService } from '../services/parent';
import { UserController } from '../controllers/user';
import { UserService } from '../services/user';

export const userRouter = express.Router();

const userController = new UserController(new UserService());

userRouter.get('/user', userController.getAll.bind(userController));

userRouter.get(
  '/user/attribute',
  userController.getByAttribute.bind(userController)
);

userRouter.get('/user/:id', userController.getById.bind(userController));
userRouter.put('/user/:id', userController.updateById.bind(userController));

userRouter.delete(
  '/user/:id',
  userController.deleteById.bind(userController)
);
