import Redis, { RedisOptions } from 'ioredis';
import { logger } from '../store'; // Assuming Logger is imported from somewhere

export interface RedisConfig {
  redisUrl: string;
}

export class RedisCache {
  private client: Redis;

  constructor(private config: RedisConfig) {
    this.client = this.createRedisClient();
  }

  private createRedisClient(): Redis {
    const { redisUrl } = this.config;
    const options: RedisOptions = this.getRedisOptions();
    const client = new Redis(redisUrl, options);
    this.setupEventHandlers(client, redisUrl);
    return client;
  }

  private getRedisOptions(): RedisOptions {
    return {
      retryStrategy: this.retryStrategy.bind(this),
    };
  }

  private retryStrategy(times: number): number | Error {
    const maxRetries = 4;
    if (times > maxRetries) {
      logger.error(
        `Failed to connect to Redis after ${maxRetries} tries. Exiting.`,
      );
      process.exit(1);
    }
    const delay = Math.min(times * 1000, 60000);
    logger.error(
      `Redis connection failed, retrying in ${delay / 1000} seconds...`,
    );
    return delay;
  }

  private setupEventHandlers(client: Redis, redisUrl: string): void {
    client.on('connect', () => {
      logger.info('Redis cache instance connected');
      logger.debug(`Redis url: ${redisUrl}`);
    });
    client.on('error', (err) => {
      logger.error(`Redis connection error: ${err}`);
    });
  }

  public getClient(): Redis {
    return this.client;
  }
}
