import mongoose from 'mongoose';
import { logger } from '../store';

// 2 minutes in milliseconds
const retryDelay = 5 * 1000;

export async function mongoConnect(DB_NAME: string, MONGO_URL: string) {
  let retries = 0;
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(MONGO_URL, {
      dbName: DB_NAME,
      maxPoolSize: 150,
      connectTimeoutMS: 5000, // Timeout after 5 seconds
    });
    logger.info(`Connected to Mongo_DB`);
    logger.debug(`Mongo URL : ${MONGO_URL}`);

    retries = 0;
  } catch (err) {
    retries++;
    logger.error(
      `Error Connecting to DB. Tried ${retries} times: `,
      err.message
    );

    // Retry logic with exponential backoff (optional)
    const waitTime = retryDelay * Math.pow(2, retries - 1);

    logger.warn(`Retrying connection in ${waitTime / 1000} seconds...`);

    await new Promise((resolve) => setTimeout(resolve, waitTime));

    // Recursively retry connection
    await mongoConnect(DB_NAME, MONGO_URL);
  }
}
