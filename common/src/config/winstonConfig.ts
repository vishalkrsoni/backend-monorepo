import { LogOptions } from '../interfaces/user';

export const options: {
  file: LogOptions;
  console: LogOptions;
} = {
  file: {
    level: 'error', // Save errors to file
    filename: './logs/errors.log',
    handleExceptions: true,
    json: true,
    maxSize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug', // Print all levels to console (can be adjusted)
    handleExceptions: true,
    json: false, // Print formatted messages to console
  },
};
