import { Request, Response } from 'express';
import { OTPService } from '../services/otp';
import { StatusCodes as HTTPStatusCodes } from 'http-status-codes';
import { APIResponse } from '@backend-monorepo/common';

export class OTPController {
  public static async createOTP(req: Request, res: Response): Promise<void> {
    try {
      const phone: string = req.body.phone;
      if (!phone) {
        res
          .status(HTTPStatusCodes.BAD_REQUEST)
          .json(APIResponse.badRequest('Phone number is required'));
        return;
      }
      const response: string = await OTPService.createOTP(phone);
      res
        .status(HTTPStatusCodes.OK)
        .json(APIResponse.created(response, 'OTP generated successfully'));
    } catch (error) {
      res
        .status(HTTPStatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          APIResponse.internalServerError(
            'Internal server error',
            error.message,
          ),
        );
    }
  }

  public static async verifyOTP(req: Request, res: Response): Promise<void> {
    try {
      const { phone, otp } = req.body;

      if (!phone || !otp) {
        res
          .status(HTTPStatusCodes.BAD_REQUEST)
          .json(APIResponse.badRequest('Phone number and OTP are required'));
        return;
      }
      const message: string = await OTPService.verifyOTP(phone, otp);
      res
        .status(HTTPStatusCodes.OK)
        .json(APIResponse.success('verified otp', message));
    } catch (error) {
      if (error.message === 'Invalid OTP' || error.message === 'OTP Expired') {
        res
          .status(HTTPStatusCodes.BAD_REQUEST)
          .json(
            APIResponse.badRequest(
              'Provided OTP is either Expired or Invalid. Generate new OTP ',
              error.message,
            ),
          );
      } else {
        res
          .status(HTTPStatusCodes.INTERNAL_SERVER_ERROR)
          .json(
            APIResponse.internalServerError(
              'Internal server error',
              error.message,
            ),
          );
      }
    }
  }
}
