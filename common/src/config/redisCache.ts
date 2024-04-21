interface RedisConfig {
  redisUrl: string;
}

const getRedisURL = (
  ENV_REDIS: string,
  REDIS_URL: string,
  REDIS_PORT: string,
  REDIS_URL_LOCAL: string,
  REDIS_PORT_LOCAL: string,
): string => {
  if (REDIS_URL && REDIS_PORT) {
    return ENV_REDIS !== 'remote'
      ? `${REDIS_URL_LOCAL}:${REDIS_PORT_LOCAL}`
      : `${REDIS_URL}:${REDIS_PORT}`;
  }
  throw new Error('Redis URL is not specified.');
};

export const getRedisCacheConfig = (
  ENV_REDIS: string,
  REDIS_URL: string,
  REDIS_PORT: string,
  REDIS_URL_LOCAL: string,
  REDIS_PORT_LOCAL: string,
): RedisConfig => {
  const redisUrl = getRedisURL(
    ENV_REDIS,
    REDIS_URL,
    REDIS_PORT,
    REDIS_URL_LOCAL,
    REDIS_PORT_LOCAL,
  );
  return { redisUrl };
};
