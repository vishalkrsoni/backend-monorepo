import { Router, Request, Response } from 'express';
import { userController } from '../store';

import {
  CustomRequest,
  extractDeviceInfoMiddleware,
  extractLocationInfoMiddleware,
  isAuthentic,
  verifyRole,
} from '@backend-monorepo/common';

export const authRouter = Router();

authRouter.post('/login', userController.login.bind(userController));
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
