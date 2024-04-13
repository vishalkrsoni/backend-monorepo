import Redis from 'ioredis';
import { logger } from '../store';

export const getRedisURL = (
  ENV_REDIS: string,
  REDIS_URL: string,
  REDIS_PORT: string,
  REDIS_URL_LOCAL: string,
  REDIS_PORT_LOCAL: string
) => {
  if (REDIS_URL && REDIS_PORT) {
    return ENV_REDIS !== 'remote'
      ? `${REDIS_URL_LOCAL}:${REDIS_PORT_LOCAL}`
      : `${REDIS_URL}:${REDIS_PORT}`;
  }
  throw new Error('Redis URL is not specified.');
};

let retryCount = 0;
const MAX_RETRIES = 4;

export const createRedisCacheClient = (redisUrl: string) =>
  new Redis(redisUrl)
    .on('connect', () => {
      logger.info(`Redis cache instance connected`);
      logger.debug(`Redis url : ${redisUrl}`);
    })
    .on('error', (err) => {
      logger.error(`Redis connection error: ${err}`);
      if (retryCount < MAX_RETRIES) {
        // Exponential backoff with a maximum wait time
        const delay = Math.min(2 ** retryCount * 1000, 60000);
        retryCount++;
        setTimeout(() => {
          createRedisCacheClient(redisUrl);
        }, delay);
      } else {
        logger.error(
          `Failed to connect to Redis after ${retryCount} tries. Exiting.`
        );
        process.exit(1);
      }
    });
