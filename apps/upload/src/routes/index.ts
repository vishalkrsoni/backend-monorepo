

import { Router } from 'express';
import { parentRouter } from './parent';
import { studentRouter } from './student';
import { teacherRouter } from './teacher';
// import { authRouter } from './auth';
// import { otpRouter } from './otp';

export const userRoutes = Router();

// Mount individual routers onto the main router
userRoutes.use('/', parentRouter);
userRoutes.use('/', studentRouter);
userRoutes.use('/', teacherRouter);

