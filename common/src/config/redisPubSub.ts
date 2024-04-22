interface NRPConfig {
  port: number;
  host: string;
  password?: string;
  retryStrategy?: () => number;
}

export const getNrpConfig = (): NRPConfig => {
  return {
    port: parseInt(
      process.env.ENV_REDIS !== 'remote'
        ? process.env.REDIS_PORT_LOCAL!
        : process.env.REDIS_PORT!,
    ),
    host:
      process.env.ENV_REDIS !== 'remote'
        ? process.env.REDIS_URL_LOCAL!
        : process.env.REDIS_HOST!,
    password: process.env.ENV_REDIS !== 'remote' ? '' : process.env.REDIS_AUTH!,
    //retry 5 times
    retryStrategy: () => 5,
  };
};
