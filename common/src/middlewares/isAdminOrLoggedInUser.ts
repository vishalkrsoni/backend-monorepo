import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { logger } from '../store';

const { FORBIDDEN, INTERNAL_SERVER_ERROR } = StatusCodes;

export const isAdminOrLoggedInUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let hasAdminRole = false;

    if (req.user?.roles) {
      hasAdminRole = req.user.role.includes('admin');
    }

    const loggedInUser = req.user.userName;
    const requestedUser = req.body.userName;

    if (hasAdminRole || loggedInUser === requestedUser) next();
    
    else {
     return res.status(FORBIDDEN).json({
        message: 'You do not have sufficient privileges',
        status: 'error',
        statusCode: FORBIDDEN,
        data: null,
      });
    }
  } catch (err) {
    logger.error('error', err);

    return res.status(INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error.',
      status: 'error',
      statusCode: INTERNAL_SERVER_ERROR,
      data: null,
    });
  }
};
