import { Request, Response, NextFunction } from 'express';
import { APIResponse } from '../utils';
import { logger } from '../store';

export const injectSchoolIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { school_id } = req.user;
  const isSuperAdmin = req.user.roles.includes('Super_Admin');
  if (!isSuperAdmin && !school_id) {
    return res
      .status(200)
      .json(
        APIResponse.internalServerError('User is not associated to any school'),
      );
  }
  if (!school_id)
    logger.warn(`class ${req.body.name} is not associated to any school`);
  req.body.warning = `class ${req.body.name} is not associated to any school`;
  req.body.school_id = school_id;

  next();
};
