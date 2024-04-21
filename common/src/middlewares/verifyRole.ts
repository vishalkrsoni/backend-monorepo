import { Request, Response, NextFunction } from 'express';
import { APIResponse } from '../utils';
import { StatusCodes } from 'http-status-codes';

const { UNAUTHORIZED, FORBIDDEN } = StatusCodes;

const checkRolesAgainstUser = (userRoles: string[], allowedRoles: string[]) =>
  allowedRoles.some((role) => userRoles.includes(role));

export const verifyRole = (...allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user?.roles) {
        return res
          .status(UNAUTHORIZED)
          .json(
            APIResponse.unauthorized(
              `Invalid request, user has no roles specified`,
            ),
          );
      }

      const hasAllowedRole = checkRolesAgainstUser(
        req.user.roles,
        allowedRoles,
      );

      if (!hasAllowedRole) {
        return res
          .status(FORBIDDEN)
          .json(
            APIResponse.forbidden(
              `You do not have the required permission: ${allowedRoles}`,
            ),
          );
      }

      next();
    } catch (error) {
      return res
        .status(UNAUTHORIZED)
        .json(
          APIResponse.unauthorized(
            error.message || `Unauthorized request`,
            error,
          ),
        );
    }
  };
};

export const isAdmin = verifyRole('Admin');
export const isStudent = verifyRole('Student');
export const isTeacher = verifyRole('Teacher');
export const isParent = verifyRole('Parent');
export const isSuperAdmin = verifyRole('SuperAdmin');
export const isAdminOrTeacher = verifyRole('SuperAdmin', 'Admin', 'Teacher');
