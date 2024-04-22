export const getRedisCacheURL = () => {
  if (process.env.REDIS_URL && process.env.REDIS_PORT) {
    return process.env.ENV_REDIS !== 'remote'
      ? `${process.env.REDIS_URL_LOCAL}:${process.env.REDIS_PORT_LOCAL}`
      : `${process.env.REDIS_URL}:${process.env.REDIS_PORT}`;
  }
  throw new Error('Redis URL is not specified.');
};
