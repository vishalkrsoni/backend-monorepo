import { Request, Response } from 'express';
import { StatusCodes as HTTPStatusCodes } from 'http-status-codes';
import { redisPubSubClient } from '../store';
import { UserService } from '../services/user';
const {
  OK,
  CREATED,
  NOT_FOUND,
  BAD_REQUEST,
  UNAUTHORIZED,
  INTERNAL_SERVER_ERROR,
  EXPECTATION_FAILED,
} = HTTPStatusCodes;

import {
  APIResponse,
  BaseController,
  logger,
  publishMessageToQueue,
  verifyRole,
} from '@backend-monorepo/common';
import { getTimeInIST } from '../utils/timeHelper';

export class UserController extends BaseController<UserService> {
  private userService: UserService;

  constructor(userService: UserService) {
    super(userService);
    this.userService = userService;
  }

  addSuperAdmin = async (req: Request, res: Response) => {
    try {
      const response = await this.service.addSuperAdmin(req.body);
      if (response) {
        res
          .status(CREATED)
          .json(
            APIResponse.created(
              response,
              `User registration successful for : ${response}`,
            ),
          );
      } else {
        res
          .status(EXPECTATION_FAILED)
          .json(APIResponse.badRequest(`Unknown failure while registration`));
      }
    } catch (error) {
      res
        .status(INTERNAL_SERVER_ERROR)
        .json(
          APIResponse.internalServerError(
            'Internal server error',
            error.message,
          ),
        );
    }
  };

  register = async (req: Request, res: Response) => {
    try {
      let requiredRoles: string[];

      switch (req.body.userType) {
        case 'Admin':
          requiredRoles = ['SuperAdmin', 'Admin'];
          break;
        case 'Teacher':
        case 'Student':
        case 'Parent':
          requiredRoles = ['Admin'];
          break;
        default:
          return res
            .status(BAD_REQUEST)
            .json(
              APIResponse.badRequest(
                `userType can only be any of: Admin, Teacher, Student, Parent`,
              ),
            );
      }

      const hasRequiredRole = requiredRoles.some((role) =>
        req.user.roles.includes(role),
      );
      if (!hasRequiredRole) {
        return res
          .status(BAD_REQUEST)
          .json(
            APIResponse.badRequest(
              `User not allowed to add new ${req.body.userType}: Not found Any of ${requiredRoles} roles`,
            ),
          );
      }

      const response = await this.service.registerUser(req.body);
      if (response.user) {
        return res.status(CREATED).json(
          APIResponse.created(
            {
              userId: response.user.id,
              userName: response.user.name,
              userRoles: response.user.userRoles,
            },
            `User registration successful for : ${response.user.name}`,
          ),
        );
      } else {
        return res
          .status(EXPECTATION_FAILED)
          .json(APIResponse.badRequest(`Unknown failure while registration`));
      }
    } catch (error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json(
          APIResponse.internalServerError(
            'Internal server error',
            error.message || 'Unknown error',
          ),
        );
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const loginResponse = await this.service.loginUser(req.body);

      if (!loginResponse.userInfo) {
        return res
          .status(UNAUTHORIZED)
          .json(APIResponse.unauthorized('Unauthorized access'));
      }

      return res
        .status(OK)
        .json(
          APIResponse.success(
            loginResponse,
            `Login successful for ${loginResponse.userInfo.userName}`,
          ),
        );
    } catch (error) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json(
          APIResponse.internalServerError(
            'Internal server error',
            error.message,
          ),
        );
    }
  };

  async getAll(req: Request, res: Response) {
    try {
      const data = await this.userService.getAll();
      if (!data || data.length === 0) {
        res.status(NOT_FOUND).json(APIResponse.notFound('No users found'));
      }
      res.json(data);
    } catch (error) {
      console.error('Error occurred while fetching users:', error);
      res
        .status(INTERNAL_SERVER_ERROR)
        .json(APIResponse.internalServerError('Failed to retrieve users'));
    }
  }
}
