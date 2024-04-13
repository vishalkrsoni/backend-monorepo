import * as cron from 'node-cron';
import { logger } from '../store';

/**
 * To Schedule a cron job.
 * @param {string} schedule - Cron schedule string.
 * @param {Function} task - Task to be executed by the cron job.
 * @param {string} [timezone] - Timezone for the cron job. Defaults to 'IST' if not provided.
 * @returns {Object} - Cron job object.
 */

export const scheduleCronJob = (
  schedule: string,
  task: () => Promise<void>,
  timezone: string = 'Asia/Kolkata'
) => {
  if (!schedule || typeof schedule !== 'string') {
    throw new Error('Invalid cron schedule string.');
  }

  if (!task || typeof task !== 'function') {
    throw new Error('Invalid task function.');
  }

  return cron.schedule(
    schedule,
    async () => {
      try {
        await task();
        logger.info('Cron job executed successfully.');
      } catch (error) {
        logger.error('Error executing cron job:', error);
      }
    },
    {
      // IST by default
      timezone: timezone,
    }
  );
};
