import { Request, Response, NextFunction } from 'express';
import { logger } from '../store';
import { mongoConnect } from '../services/mongoConnect';

let isConnected = false;

export const dbPing = async (
  req: Request,
  res: Response,
  mongo_url:string,
  db_name:string,
  next: NextFunction
): Promise<void> => {
  try {
    if (isConnected) {
      logger.info('Database already connected');
      next();
    } else {
      await mongoConnect(mongo_url,db_name);
      logger.info('Connected to the database');
      isConnected = true;
      next();
    }
  } catch (err) {
    logger.error('Failed to connect to the database');
    res.status(500).json({ error: 'Failed to connect to the database' });
  }
};
