import Redis from 'ioredis';
import { startKafkaConsumer } from '../services/kafkaConsumer';
import { logger } from '../store';

export const listenToRedisEvents = async (
  redisClient: Redis,
  event: string
) => {
  // Creating a dedicated subscriber connection
  const subscriber = redisClient.duplicate();
  await subscriber.subscribe(event);

  subscriber.on('message', (event: string, message: string) => {
    logger.info(`Event received from redis: ${event}`);

    // testing
    handleEventData(event, JSON.parse(message));
  });

  subscriber.on('error', (error: Error) => {
    logger.error(`Error subscribing to Event '${Event}':`, error);
  });
};

export const handleEventData = (event: string, EventData: any) => {
  // TODO : handle events here
  logger.info(`Event handle called for ${event} :`, EventData);
};

export const listenToKafkaTopic = async (topic: string) => {
  try {
    return await startKafkaConsumer(topic);
  } catch (error) {
    logger.error('Error starting Kafka consumer:', error);
    process.exit(1);
  }
};
