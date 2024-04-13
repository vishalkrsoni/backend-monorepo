import { initializeRedisPubSub, logger } from '@backend-monorepo/common';

const {
  ENV_REDIS,
  REDIS_HOST,
  REDIS_AUTH,
  REDIS_URL,
  REDIS_PORT,
  REDIS_URL_LOCAL,
  REDIS_PORT_LOCAL,
} = process.env;
export const redisPubSubInstance = initializeRedisPubSub({
  REDIS_HOST,
  REDIS_AUTH,
  ENV_REDIS,
  REDIS_URL,
  REDIS_PORT,
  REDIS_URL_LOCAL,
  REDIS_PORT_LOCAL,
});
