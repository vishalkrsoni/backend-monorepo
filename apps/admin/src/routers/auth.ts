import { Router, Request, Response } from 'express';
import { userController } from '../store';

import {
  CustomRequest,
  extractDeviceInfoMiddleware,
  extractLocationInfoMiddleware,
  isAuthentic,
  verifyRole,
} from '@backend-monorepo/common';
import { loginLimiter } from '../middlewares/loginLimiter';

export const authRouter = Router();

authRouter.post(
  '/register-admin',
  loginLimiter,
  userController.addSuperAdmin.bind(userController),
);

authRouter.post(
  '/login',
  loginLimiter,
  userController.login.bind(userController),
);

authRouter.use(isAuthentic).use(verifyRole('Super_Admin', 'Admin'));

authRouter.post('/register', userController.register.bind(userController));

authRouter.get(
  '/safe-route',
  isAuthentic,
  verifyRole('admin'),
  (req: Request, res: Response) => {
    res.json({
      message: 'safe route accessed',
      statusCode: 200,
      status: 'success',
      data: req.user,
    });
  },
);

// Sample use of middleware in an Express route
authRouter.get(
  '/device-info',
  extractDeviceInfoMiddleware,
  extractLocationInfoMiddleware,
  (req: CustomRequest, res) => {
    // Access device information from req.deviceInfo and location information from req.locationInfo
    res.json({ deviceInfo: req.deviceInfo, locationInfo: req.locationInfo });
  },
);
