import { Request, Response } from 'express';
import { UserService } from '../services/user';
import { HttpStatusCode } from 'axios';
import { getTimeInIST } from '../utils/timeHelper';
import {
  APIResponse,
  BaseController,
  logger,
  publishMessageToQueue,
  verifyRole,
} from '@backend-monorepo/common';

export class UserController extends BaseController<UserService> {
  private userService: UserService;

  constructor(userService: UserService) {
    super(userService);
    this.userService = userService;
  }

  addSuperAdmin = async (req: Request, res: Response) => {
    try {
      const response = await this.service.addSuperAdmin(req.body);

      return res.status(response.statusCode).json(response);
    } catch (error) {
      return res.status(HttpStatusCode.InternalServerError).json(error);
    }
  };

  register = async (req: Request, res: Response) => {
    try {
      req.body.roles = req.user.roles;
      const response = await this.service.registerUser(req.body);
      if (response.success) {
        const { user } = response.data;
        return res.status(HttpStatusCode.Created).json(
          APIResponse.created(
            `User registration successful for : ${user.name}`,
            {
              userId: user.id,
              userName: user.name,
              userRoles: user.userRoles,
            },
          ),
        );
      } else {
        return res.status(response.statusCode).send(response);
      }
    } catch (error) {
      return res.status(HttpStatusCode.InternalServerError).json(error);
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const response = await this.service.loginUser(req.body);

      return res
        .status(response.statusCode)
        .json(
          APIResponse.success(
            `Login successful for ${response.data.userName}`,
            response,
          ),
        );
    } catch (error) {
      return res.status(HttpStatusCode.InternalServerError).json(error);
    }
  };
}
