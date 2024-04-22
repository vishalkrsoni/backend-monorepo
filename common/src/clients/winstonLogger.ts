import winston = require('winston');
import { format } from 'util';
import { options } from '../config/winstonConfig';

const errorFormat = winston.format.combine(
  winston.format.colorize({ all: true }), // Colorize all levels
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf((info) => {
    let message = `${info.timestamp} - [${info.level}] ${info.message}`;
    if (info.stack) {
      message += `\n${info.stack}`;
    }
    return message;
  }),
);

const infoFormat = winston.format.combine(
  winston.format.colorize({ level: true, all: true }), // Colorize only info and above
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(
    (info) => `${info.timestamp} - [${info.level}] ${info.message}`,
  ),
);

const objectFormat = winston.format.printf((info) => {
  let formattedMessage = '';
  const data = info.message;
  Object.keys(data).forEach((key) => {
    const value = data[key];
    let colorCode = '\x1b[0m'; // Reset color
    if (typeof value === 'number') {
      colorCode = '\x1b[34m'; // Blue for numbers
    } else if (typeof value === 'string') {
      colorCode = '\x1b[33m'; // Yellow for strings
    } else if (value instanceof Date) {
      colorCode = '\x1b[35m'; // Pink for dates
    }
    formattedMessage += `${colorCode}${key}: ${value}\x1b[6m\n`; // Apply color and reset
  });
  return formattedMessage;
});

export class WinstonLogger {
  private readonly logger: winston.Logger;
  constructor(environment?: string) {
    this.logger = winston.createLogger({
      levels: winston.config.npm.levels,
      transports: [
        new winston.transports.Console({
          ...options.console,
          level: 'silly', // Print all levels (can be adjusted)
          format: winston.format.combine(
            winston.format.errors({ stack: true }), // Include stack trace for errors
            errorFormat, // Use colored format for errors
            infoFormat, // Use colored format for info and above
            winston.format.splat(),
            winston.format((info) => {
              if (info.message && typeof info.message === 'object') {
                info.message = objectFormat.transform(info.message);
              }
              return info;
            })(),
          ),
        }),
      ],
      exitOnError: false,
    });
  }

  // Public methods for logging
  log(level: string, ...args: any[]): void {
    let formattedMessage = format(...args);
    this.logger.log({ level, message: formattedMessage });
  }

  error(...args: any[]): void {
    this.log('error', ...args);
  }

  warn(...args: any[]): void {
    this.log('warn', ...args);
  }

  info(...args: any[]): void {
    this.log('info', ...args);
  }

  debug(...args: any[]): void {
    this.log('debug', ...args);
  }

  silly(...args: any[]): void {
    this.log('silly', ...args);
  }
}
