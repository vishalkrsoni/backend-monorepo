import { Router } from 'express';
import { OTPController } from '../controllers';

export const otpRouter = Router();

otpRouter.post('/create-otp', OTPController.createOTP);
otpRouter.post('/verify-otp', OTPController.verifyOTP);
