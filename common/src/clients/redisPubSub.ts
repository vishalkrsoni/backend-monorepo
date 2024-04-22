import { Redis } from 'ioredis';
import { logger } from '../store';
const NRP = require('node-redis-pubsub');
import { NodeRedisPubSub } from 'node-redis-pubsub';
import { getNrpConfig } from '../config/redisPubSub';

let retryCount = 0;
const MAX_RETRIES = 4;

export const getPubSubClient = async (): Promise<NodeRedisPubSub> => {
  try {
    const redisInstance = new Redis(getNrpConfig());

    const nrpPubSub: NodeRedisPubSub = new NRP({
      emitter: redisInstance,
      receiver: redisInstance,
      scope: 'demo',
    });

    const nrpInfo = nrpPubSub.getRedisClient().options;

    logger.info(`Successfully created new pub-sub instance.`);
    logger.debug(`Pub-sub host : ${nrpInfo.host} , port : ${nrpInfo.port}`);
    return nrpPubSub;
  } catch (error) {
    logger.error(`Error creating Redis Pub/Sub instance: ${error}`);
    if (retryCount < MAX_RETRIES) {
      // Exponential backoff with a maximum wait time
      const delay = Math.min(2 ** retryCount * 1000, 60000);
      retryCount++;
      logger.info(`Retrying connection to Redis in ${delay / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return getPubSubClient();
      // Retry connection
    } else {
      logger.error('Failed to connect to Redis after retries. Exiting.');
      process.exit(1);
    }
  }
};
