import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {
  checkNetworkConnection,
  logger,
  mongoConnect,
} from '@backend-monorepo/common';

import { userRoutes } from './routes';
const { DB_NAME, MONGO_URL, USER_PORT } = process.env;
const app = express();
checkNetworkConnection();
mongoConnect(DB_NAME, MONGO_URL);

app.use(cookieParser()).use(express.json()).use(cors()).use(userRoutes);

app
  .listen(USER_PORT, () =>
    logger.info(`User-service started : http://localhost:${USER_PORT}`)
  )
  .on('error', logger.error);
