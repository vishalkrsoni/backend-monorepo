import { Request, Response, NextFunction } from 'express';

export const injectSchoolIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { school_id } = req.user;

  req.body.school_id = school_id;

  next();
};
