import { Redis, RedisOptions } from 'ioredis';
import { logger } from '../store';
import { NodeRedisPubSub } from 'node-redis-pubsub';

interface RedisPubSubConfig {
  port: number;
  host: string;
  password?: string;
  retryStrategy?: () => number;
}

export class RedisPubSub {
  private pubSub: NodeRedisPubSub | null = null;

  constructor(private config: RedisPubSubConfig) {
    
  }

  private async createRedisClient(): Promise<Redis> {
    const { host, port, password } = this.config;
    const options: RedisOptions = {
      port,
      host,
      password,
    };
    return new Redis(options);
  }

  private async createPubSubInstance(): Promise<NodeRedisPubSub> {
    const redisClient = await this.createRedisClient();

    const nrpPubSub = new NodeRedisPubSub({
      emitter: redisClient,
      receiver: redisClient,
      scope: 'demo',
    });

    const nrpInfo = nrpPubSub.getRedisClient().options;
    logger.info('Successfully created new pub-sub instance.');
    logger.debug(`Pub-sub host: ${nrpInfo.host}, port: ${nrpInfo.port}`);
    return nrpPubSub;
  }

  public async getPubSubInstance(): Promise<NodeRedisPubSub> {
    if (!this.pubSub) {
      this.pubSub = await this.createPubSubInstance();
    }
    return this.pubSub;
  }
}
