import { ConsoleLogger, WinstonLogger } from './clients';

const { ENVIRONMENT } = process.env;

export const logger =
  ENVIRONMENT == 'local'
    ? new ConsoleLogger(ENVIRONMENT)
    : new WinstonLogger(ENVIRONMENT);
