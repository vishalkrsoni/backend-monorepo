import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { StatusCodes as HTTPStatusCodes } from 'http-status-codes';
import { redisPubSubInstance } from '../store';
import { UserService } from '../services/user';
const { OK, CREATED, UNAUTHORIZED, INTERNAL_SERVER_ERROR } = HTTPStatusCodes;

import {
  APIResponse,
  BaseController,
  publishMessageToQueue,
} from '@backend-monorepo/common';
const { ACCESS_TOKEN_VALIDITY, JWT_SECRET_KEY } = process.env;

export class UserController extends BaseController<UserService> {
  private userService: UserService;

  constructor(userService: UserService) {
    super(userService);
    this.userService = userService;
  }

  register = async (req: Request, res: Response) => {
    try {
      const { name, userName, password, userType, school_id } = req.body;

      const response = await this.service.registerUser(req.body);

      const eventType = userType.toUpperCase() + '_CREATE';

      const newEvent = {
        type: eventType,
        data: {
          userId: response.user.id,
          userName: response.user.name,
          userType,
          userRoles: response.user.userRoles,
        },
        createdAt: new Date(),
      };

      // Sending event to redis-pub-sub

      await publishMessageToQueue(
        redisPubSubInstance,
        'auth-queue',
        JSON.stringify(newEvent),
      );

      res.status(CREATED).json(
        APIResponse.created(
          {
            userId: response.user.id,
            userName: response.user.name,
            userType,
            userRoles: response.user.userRoles,
          },
          `User registeration successfully for : ${response.user.name}`,
        ),
      );
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

  login = async (req: Request, res: Response) => {
    try {
      const { userName, password, school_id } = req.body;
      const user = await this.service.loginUser(userName, password);

      const tokenData = {
        id: user.id,
        name: user.name,
        school_id,
        userName: user.userName,
        roles: user.userRoles,
        loginAt: new Date(Date.now()),
      };
      const token = this.generateAccessToken(
        tokenData,
        JWT_SECRET_KEY,
        ACCESS_TOKEN_VALIDITY,
      );

      const newEvent = {
        type: 'USER_LOGGED',
        data: user,
        createdAt: new Date(Date.now()),
      };

      // Sending event to kafka
      // await sendToKafka('USER_CREATE', JSON.stringify(newEvent));

      res.status(OK).json(
        APIResponse.success(
          {
            school_id,
            userName,
            userId: user._id,
            userRoles: user.userRoles,
            accessToken: token,
            login_time: new Date(Date.now()),
          },
          `Login successful for ${userName}`,
        ),
      );
    } catch (error) {
      res
        .status(UNAUTHORIZED)
        .json(APIResponse.unauthorized('Unauthorized acces', error.message));
    }
  };

  generateAccessToken = (
    tokenData: any,
    secretKey: string,
    tokenExpiry: string,
  ) => {
    return jwt.sign({ ...tokenData }, secretKey, {
      expiresIn: tokenExpiry,
    });
  };

  async getAll(req: Request, res: Response) {
    try {
      const data = await this.userService.getAll();
      res.json(data);
    } catch (error) {
      console.error('Error occurred while fetching users:', error);
      res.status(500).json({ error: 'Failed to retrieve users' });
    }
  }
}
