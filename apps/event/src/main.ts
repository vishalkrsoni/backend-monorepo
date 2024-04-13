import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { router } from './routes/email';

import {
  logger,
  mongoConnect,
  listenToRedisQueue,
  checkNetworkConnection,
} from '@backend-monorepo/common';
import { redisPubSubInstance } from './store';
import { handleIncomingRedisEvent } from './utils/handleredis';

const { MONGO_URL, DB_NAME, EVENT_HANDLER_PORT } = process.env;
const app = express();

checkNetworkConnection();
mongoConnect(DB_NAME, MONGO_URL);

app.use(cookieParser()).use(express.json()).use(cors()).use(router);

// listenToKafkaTopic('USER_CREATE');

// listening and handling redis events using callback function
listenToRedisQueue(redisPubSubInstance, 'auth-queue', handleIncomingRedisEvent)
  .then(() => {
    logger.info('Listening to Redis : auth-queue');
  })
  .catch((error) => {
    logger.error('Error:', error);
  });

app
  .listen(EVENT_HANDLER_PORT, () =>
    logger.info(
      `event-handler started : http://localhost:${EVENT_HANDLER_PORT}`
    )
  )
  .on('error', logger.error);
