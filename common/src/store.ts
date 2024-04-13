import { ConsoleLogger, WinstonLogger } from './utils';

const { ENVIRONMENT } = process.env;

export const logger =
  ENVIRONMENT == 'local'
    ? new ConsoleLogger(ENVIRONMENT)
    : new WinstonLogger(ENVIRONMENT);
