// export { authRouter } from './auth';
import { Router } from 'express';
import { authRouter } from './auth';
import { userRouter } from './user';
import { otpRouter } from './otp';
// import { classRouter } from './class';
// import { classScheduleRouter } from './classSchedule';
// import { subjectRouter } from './subject';
import { schoolRouter } from './school';
// import { parentRouter } from './parent';
// import { teacherRouter } from './teacher';
// import { studentRouter } from './student';

export const adminRoutes = Router();

adminRoutes.use('/', authRouter);
adminRoutes.use('/', userRouter);
adminRoutes.use('/', otpRouter);
adminRoutes.use('/', schoolRouter);
// adminRoutes.use('/', classRouter);
// adminRoutes.use('/', classScheduleRouter);
// adminRoutes.use('/', subjectRouter);
// adminRoutes.use('/', parentRouter);
// adminRoutes.use('/', teacherRouter);
// adminRoutes.use('/', studentRouter);

