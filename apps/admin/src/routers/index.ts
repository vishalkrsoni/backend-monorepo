// export { authRouter } from './auth';
import { Router } from 'express';
import { authRouter } from './auth';
import { otpRouter } from './otp';
import { classRouter } from './class';
import { classScheduleRouter } from './classSchedule';
import { subjectRouter } from './subject';
import { schoolRouter } from './school';
import { userRouter } from './user';

export const adminRoutes = Router();

// Mount individual routers onto the main router
adminRoutes.use('/', authRouter);
adminRoutes.use('/', schoolRouter);
adminRoutes.use('/', otpRouter);
adminRoutes.use('/', classRouter);
adminRoutes.use('/', classScheduleRouter);
adminRoutes.use('/', subjectRouter);
adminRoutes.use('/', userRouter);