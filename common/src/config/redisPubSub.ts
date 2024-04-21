export interface RedisPubSubConfig {
  port: number;
  host: string;
  password?: string;
  retryStrategy?: () => number;
}

export const getRedisPubSubConfig = (env: {
  ENV_REDIS?: string;
  REDIS_HOST?: string;
  REDIS_AUTH?: string;
  REDIS_URL?: string;
  REDIS_PORT?: string;
  REDIS_URL_LOCAL?: string;
  REDIS_PORT_LOCAL?: string;
}): RedisPubSubConfig => {
  const {
    ENV_REDIS,
    REDIS_HOST,
    REDIS_AUTH,
    REDIS_URL,
    REDIS_PORT,
    REDIS_URL_LOCAL,
    REDIS_PORT_LOCAL,
  } = env;

  const port = parseInt(
    ENV_REDIS !== 'remote' ? REDIS_PORT_LOCAL! : REDIS_PORT!,
  );
  const host = ENV_REDIS !== 'remote' ? REDIS_URL_LOCAL! : REDIS_HOST!;
  const password = ENV_REDIS !== 'remote' ? '' : REDIS_AUTH!;
  const retryStrategy = () => 5; // Default retry count

  return { port, host, password, retryStrategy };
};
