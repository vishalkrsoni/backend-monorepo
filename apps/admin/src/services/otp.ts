import { createHmac } from 'crypto';
import { generateNumericOTP } from '../utils/otp';
import { logger } from '@backend-monorepo/common';

const { OTP_VALIDITY, OTP_SECRET_KEY } = process.env;

export class OTPService {
  public static async createOTP(phone: string): Promise<any> {
    const newOTP: string = generateNumericOTP(6);
    const expiresOn: number = Date.now() + Number(OTP_VALIDITY);
    const data = `${phone}.${newOTP}.${expiresOn}`;
    const hashedData: string = createHmac('sha256', OTP_SECRET_KEY)
      .update(data)
      .digest('hex');
    const fullHash = `${hashedData}.${expiresOn}`;

    logger.info('OTP generated is:', newOTP);

    // await redis.hset(phone, newOTP, fullHash);

    // const mailResponse = await transporter.sendMail(
    //   emailOptions(
    //     GMAIL_EMAIL,
    //     GMAIL_EMAIL_RECIPIENT,
    //     'otp generated',
    //     `otp generated for ${phone} : ${newOTP}`
    //   )
    // );
    // LLogger.logger.info(mailResponse);

    return { phone, otp: newOTP };
  }

  public static async verifyOTP(phone: string, otp: string): Promise<string> {
    const hash = 'await redis.hget(phone, otp);';
    if (!hash) logger.info('Otp verify called with:', hash);

    // throw new Error('Invalid OTP');

    const currTime: number = Date.now();
    logger.info('time now is :', new Date(Date.now()));

    const [originalHash, expiresOn]: string[] = hash.split('.');

    if (currTime > parseInt(expiresOn)) throw new Error('OTP Expired');

    const data = `${phone}.${otp}.${expiresOn}`;
    const newCreatedHash: string = createHmac('sha256', OTP_SECRET_KEY)
      .update(data)
      .digest('hex');
    if (newCreatedHash === originalHash) {
      return 'OTP verified successfully';
    }
    throw new Error('Invalid OTP');
  }
}
