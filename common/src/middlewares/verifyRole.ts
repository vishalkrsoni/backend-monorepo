import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const { UNAUTHORIZED, FORBIDDEN } = StatusCodes;

const checkRolesAgainstUser = (userRoles: string[], allowedRoles: string[]) =>
  allowedRoles.some((role) => userRoles.includes(role));

export const verifyRole = (...allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('token user:', req.user);
      if (!req.user?.roles) {
        throw new Error('Unauthorized request');
      }

      const hasAllowedRole = checkRolesAgainstUser(
        req.user.roles,
        allowedRoles,
      );

      if (!hasAllowedRole) {
        return res.status(FORBIDDEN).json({
          message: `You do not have the required permission: ${allowedRoles}`,
          status: 'error',
          statusCode: FORBIDDEN,
          data: null,
        });
      }

      next();
    } catch (error) {
      return res.status(UNAUTHORIZED).json({
        message: error.message || 'Unauthorized request',
        status: 'error',
        statusCode: UNAUTHORIZED,
        data: null,
      });
    }
  };
};

export const isAdmin = verifyRole('Admin');
export const isStudent = verifyRole('Student');
export const isTeacher = verifyRole('Teacher');
export const isParent = verifyRole('Parent');
export const isSuperAdmin = verifyRole('SuperAdmin');
export const isAdminOrTeacher = verifyRole('SuperAdmin', 'Admin', 'Teacher');
