import { Redis } from 'ioredis';
import { logger } from '../store';
const NRP = require('node-redis-pubsub');
import { NodeRedisPubSub } from 'node-redis-pubsub';

interface NRPConfig {
  port: number;
  host: string;
  password?: string;
  retryStrategy?: () => number;
}

export const initializeRedisPubSub = (pubSubEnv: {
  REDIS_HOST?: string;
  REDIS_AUTH?: string;
  ENV_REDIS?: string;
  REDIS_URL?: string;
  REDIS_PORT?: string;
  REDIS_URL_LOCAL?: string;
  REDIS_PORT_LOCAL?: string;
}) => {
  const {
    REDIS_HOST,
    REDIS_AUTH,
    ENV_REDIS,
    REDIS_URL,
    REDIS_PORT,
    REDIS_URL_LOCAL,
    REDIS_PORT_LOCAL,
  } = pubSubEnv;

  if (!REDIS_URL || !REDIS_PORT) {
    throw new Error('Redis URL and/or port are not specified.');
  }

  const nrpConfig: NRPConfig = {
    port: parseInt(ENV_REDIS !== 'remote' ? REDIS_PORT_LOCAL! : REDIS_PORT!),
    host: ENV_REDIS !== 'remote' ? REDIS_URL_LOCAL! : REDIS_HOST!,
    password: ENV_REDIS !== 'remote' ? '' : REDIS_AUTH!,
    retryStrategy: () => 5, // Default retry count
  };

  let retryCount = 0;
  const MAX_RETRIES = 4; // Maximum number of retries

  const createPubSub = async (): Promise<NodeRedisPubSub> => {
    try {
      const redisClient = new Redis(nrpConfig);

      const nrpPubSub: NodeRedisPubSub = new NRP({
        emitter: redisClient,
        receiver: redisClient,
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
        logger.info(
          `Retrying connection to Redis in ${delay / 1000} seconds...`
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
        return createPubSub(); 
        // Retry connection
      } else {
        logger.error('Failed to connect to Redis after retries. Exiting.');
        process.exit(1);
      }
    }
  };

  return createPubSub();
};
