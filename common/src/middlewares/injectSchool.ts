import { Request, Response, NextFunction } from 'express';
import { APIResponse } from '../utils';
import { logger } from '../store';
import { StatusCodes } from 'http-status-codes';

export const injectSchoolIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { school } = req.user;
  const isSuperAdmin = req.user.roles.includes('Super_Admin');


  if (!isSuperAdmin && !school) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json(
        APIResponse.forbidden(
          `User is not associated to any school,please add a school first`,
        ),
      );
  }
  if (school) req.body.school_id = school;
  else {
    logger.warn(`${req.body.name} is not associated to any school`);
    req.body.warning = `Can not associate to any school`;
  }

  next();
};
