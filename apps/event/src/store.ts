import {
  kafkaInstance,
  RedisCache,
  RedisConfig,
  RedisPubSub,
  getKafkaConfig,
  CloudinaryClient,
  cloudinaryConfig,
  RedisPubSubConfig,
  getRedisPubSubConfig,
  initializeRedisPubSub,
} from '@backend-monorepo/common';

const {
  ENV_REDIS,
  REDIS_HOST,
  REDIS_AUTH,
  REDIS_URL,
  REDIS_PORT,
  REDIS_URL_LOCAL,
  REDIS_PORT_LOCAL,
} = process.env;

// const redisConfig: RedisConfig = getRediCacheConfig(
//   ENV_REDIS,
//   REDIS_URL,
//   REDIS_PORT,
//   REDIS_URL_LOCAL,
//   REDIS_PORT_LOCAL,
// );

const redisPubSubConfig: RedisPubSubConfig = getRedisPubSubConfig({
  ENV_REDIS,
  REDIS_HOST,
  REDIS_AUTH,
  REDIS_URL,
  REDIS_PORT,
  REDIS_URL_LOCAL,
  REDIS_PORT_LOCAL,
});

const kafkaConfig = getKafkaConfig();

// const redisClient = new RedisCache(redisConfig);


// const kafkaInstance = new KafkaClient(kafkaConfig);

// export const kafkaClient = kafkaInstance.getClient();

// export const redisCacheClient = redisClient.getClient();

export const cloudinaryClient = new CloudinaryClient(cloudinaryConfig);

// export const redisPubSubClient = redisPubSub.getPubSubInstance();

// export const redisPubSub = initializeRedisPubSub({
//   REDIS_HOST,
//   REDIS_AUTH,
//   ENV_REDIS,
//   REDIS_URL,
//   REDIS_PORT,
//   REDIS_URL_LOCAL,
//   REDIS_PORT_LOCAL,
// });
