import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { StatusCodes as HTTPStatusCodes } from 'http-status-codes';
import * as authService from '../services/auth';
import { APIResponse, publishMessageToQueue } from '@backend-monorepo/common';
import { redisPubSubInstance } from '../store';

const { ACCESS_TOKEN_VALIDITY, JWT_SECRET_KEY } = process.env;

const { OK, CREATED, UNAUTHORIZED, INTERNAL_SERVER_ERROR } = HTTPStatusCodes;

export const register = async (req: Request, res: Response) => {
  try {
    const { name, userName, password, userType } = req.body;

    const response = await authService.registerUser(
      name,
      userName,
      password,
      userType
    );

    const eventType = userType.toUpperCase() + '_CREATE';

    const newEvent = {
      type: eventType,
      data: response.user,
      createdAt: new Date(),
    };

    // Sending event to redis-pub-sub

    await publishMessageToQueue(
      redisPubSubInstance,
      'auth-queue',
      JSON.stringify(newEvent)
    );

    res
      .status(CREATED)
      .json(APIResponse.created(response.user, 'User registered successfully'));
  } catch (error) {
    res
      .status(INTERNAL_SERVER_ERROR)
      .json(
        APIResponse.internalServerError('Internal server error', error.message)
      );
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { userName, password } = req.body;
    const user = await authService.loginUser(userName, password);

    const tokenData = {
      id: user.id,
      name: user.name,
      userName: user.userName,
      roles: user.userRoles,
      loginAt: new Date(Date.now()),
    };
    const token = generateAccessToken(
      tokenData,
      JWT_SECRET_KEY,
      ACCESS_TOKEN_VALIDITY
    );

    const newEvent = {
      type: 'USER_LOGGED',
      data: user,
      createdAt: new Date(Date.now()),
    };

    // Sending event to kafka
    // await sendToKafka('USER_CREATE', JSON.stringify(newEvent));

    res
      .status(OK)
      .json(
        APIResponse.success(
          { userId: user._id, userName, token },
          'Login successful'
        )
      );
  } catch (error) {
    res
      .status(UNAUTHORIZED)
      .json(APIResponse.unauthorized('Unauthorized acces', error.message));
  }
};

export const generateAccessToken = (
  tokenData: any,
  secretKey: string,
  tokenExpiry: string
) => {
  return jwt.sign({ ...tokenData }, secretKey, {
    expiresIn: tokenExpiry,
  });
};
