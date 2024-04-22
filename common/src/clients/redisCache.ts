import Redis from 'ioredis';
import { logger } from '../store';
let retryCount = 0;
const MAX_RETRIES = 4;

export const getCacheClient = (redisUrl: string) =>
  new Redis(redisUrl)
    .on('connect', () => {
      logger.info(`Redis cache instance connected`);
      logger.debug(`Redis url : ${redisUrl}`);
    })
    .on('error', (err) => {
      logger.error(`Redis connection error: ${err}`);
      if (retryCount < MAX_RETRIES) {
        const delay = Math.min(2 ** retryCount * 1000, 60000); // Exponential backoff
        retryCount++;
        setTimeout(() => {
          getCacheClient(redisUrl);
        }, delay);
      } else {
        logger.error(
          `Failed to connect to Redis after ${retryCount} tries. Exiting.`,
        );
        process.exit(1);
      }
    });
