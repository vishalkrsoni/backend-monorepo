import { KafkaClass, RedisCache, RedisPubSub } from './clients';
import { getKafkaConfig } from './config/kafka';
import { getRedisCacheConfig } from './config/redisCache';
import { RedisPubSubConfig, getRedisPubSubConfig } from './config/redisPubSub';
import { initializeRedisPubSub } from './services/redisPubSub';
import { ConsoleLogger, WinstonLogger } from './utils';
const {
  ENV_REDIS,
  REDIS_URL,
  REDIS_PORT,
  REDIS_URL_LOCAL,
  REDIS_PORT_LOCAL,
  REDIS_AUTH,
  REDIS_HOST,
  ENVIRONMENT,
} = process.env;

const redisCacheConfig = getRedisCacheConfig(
  ENV_REDIS,
  REDIS_URL,
  REDIS_PORT,
  REDIS_URL_LOCAL,
  REDIS_PORT_LOCAL,
);


const redisCache = new RedisCache(redisCacheConfig);
export const redisCacheClient = redisCache.getClient();


const kafka = new KafkaClass(getKafkaConfig());

export const kafkaInstance = kafka.getInstance();
export const kafkaConsumer = kafka.getConsumer();
export const kafkaProducer = kafka.getProducer();


export const logger =
ENVIRONMENT == 'local'
? new ConsoleLogger(ENVIRONMENT)
: new WinstonLogger(ENVIRONMENT);


const redisPubSubConfig = getRedisPubSubConfig({
  ENV_REDIS,
  REDIS_HOST,
  REDIS_AUTH,
  REDIS_URL,
  REDIS_PORT,
  REDIS_URL_LOCAL,
  REDIS_PORT_LOCAL,
});

const redisPubSub = new RedisPubSub(redisPubSubConfig);
export const redisPubSubClient = redisPubSub.getPubSubInstance();