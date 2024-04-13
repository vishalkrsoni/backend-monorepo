import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const { UNAUTHORIZED, FORBIDDEN } = StatusCodes;

export const verifyRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.roles) {
      const userRoles = req.user.roles;
      console.log('roles:', req.user.roles);
      const hasRequiredRole = roles.some((role) => userRoles.includes(role));
      console.log('from token', userRoles);
      console.log('from input', roles);

      if (hasRequiredRole) {
        next();
      } else {
        return res.status(FORBIDDEN).json({
          message: 'You do not have sufficient privileges.',
          status: 'error',
          statusCode: FORBIDDEN,
          data: null,
        });
      }
    } else {
      return res.status(UNAUTHORIZED).json({
        message: 'Unauthorized request',
        status: 'error',
        statusCode: UNAUTHORIZED,
        data: null,
      });
    }
  };
};

export const isAdmin = verifyRole('admin');
export const isStudent = verifyRole('student');
export const isTeacter = verifyRole('teacher');
export const isParent = verifyRole('parent');
