import jwt = require('jsonwebtoken');
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { logger } from '../store';
import { APIResponse } from '../utils';

const { JWT_SECRET_KEY } = process.env;

declare module 'express' {
  interface Request {
    user?: any;
  }
}

export const isAuthentic = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json(APIResponse.unauthorized(`Invalid request, No token found`));
    }

    const verifiedUser = jwt.verify(token, JWT_SECRET_KEY as string);

    // logger.info('verified user: ', verifiedUser);

    req.user = verifiedUser;
    if (verifiedUser) {
      next();
    } else {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json(APIResponse.unauthorized(`Incorrect/malfunctioned token found`));
    }
  } catch (err) {
    logger.error('Error during token verification:', err);

    let tokenErrorMessage: string;

    if (err.name === 'JsonWebTokenError') {
      tokenErrorMessage = 'wrong token passed';
    } else if (err.name === 'TokenExpiredError') {
      tokenErrorMessage = 'token expired';
    } else {
      tokenErrorMessage = 'invalid token';
    }

    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json(APIResponse.unauthorized(tokenErrorMessage, err));
  }
};
