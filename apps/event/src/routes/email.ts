import {
  listenToKafkaTopic,
  listenToRedisEvents,
  listenToRedisQueue,
} from '@backend-monorepo/common';
import { Router } from 'express';
// import * as authController from '../controllers/authController';

export const router = Router();

router.get('/kafka', async (req, res) => {
  const response = await listenToKafkaTopic('vivaah-auth');

  res.send('welcome to kafka route');
});

router.get('/redis', async (req, res) => {
  // const responseQ = await listenToRedisQueue('auth-queue');
  // const responseE = await listenToRedisEvents(redis, 'USER_CREATE');
  // res.send({ responseE, responseQ });
  res.send('hello from redis route');
});
