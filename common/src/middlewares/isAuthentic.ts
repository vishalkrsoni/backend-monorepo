import jwt = require('jsonwebtoken');
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { logger } from '../store';

const { JWT_SECRET_KEY } = process.env;

// Declare a module to add the user property
// to the Express Request interface
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
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: 'valid token required',
        status: 'error',
      });
    }

    const verifiedUser = jwt.verify(token, JWT_SECRET_KEY as string);

    // logger.info('verified user: ', verifiedUser);

    req.user = verifiedUser;
    if (verifiedUser) {
      next();
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: 'incorrect token',
        status: 'error',
      });
    }
  } catch (err) {
    logger.error('Error during token verification:', err);

    let tokenError: string;

    if (err.name === 'JsonWebTokenError') {
      tokenError = 'wrong token passed';
    } else if (err.name === 'TokenExpiredError') {
      tokenError = 'token expired';
    } else {
      tokenError = 'invalid token';
    }

    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: tokenError,
      status: 'error',
    });
  }
};
