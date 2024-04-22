import { logger } from "../store";

export const parseMessageToObject = (message: string): any => {
  try {
    return JSON.parse(message);
  } catch (error) {
    logger.error('Error parsing message:', error);
    return null;
  }
};