const NRP = require('node-redis-pubsub');

import { EventMessage } from '../types/types';
import { NodeRedisPubSub } from 'node-redis-pubsub';

import Redis from 'ioredis';
import { logger } from '../store';
import { consumeEventsFromKafka } from '../services';
import { getKafkaConsumer } from '../clients';

export const listenToRedisEvents = async (
  redisClient: Redis,
  event: string,
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
    return await consumeEventsFromKafka(getKafkaConsumer(topic), topic);
  } catch (error) {
    logger.error('Error starting Kafka consumer:', error);
    process.exit(1);
  }
};

type RedisPubSubInstance = any;

export const emitMessageToRedisTopic = async (
  redisPubSub: Redis,
  topic: string,
  event: EventMessage,
) => {
  try {
    await redisPubSub.emit(topic, event);
  } catch (error) {
    logger.error(`Error emitting message to: ${topic}`, error);
  }
};

export const publishMessageToQueue = async (
  redisPubSubInstance: Promise<NodeRedisPubSub>,

  queueName: string,
  message: string,
) => {
  try {
    const redisPubSub = await redisPubSubInstance;

    await redisPubSub.publish(queueName, message);
    logger.info(
      `Message published to queue ${queueName}:`,
      JSON.parse(message),
    );
  } catch (error) {
    logger.error('Error publishing message:', error);
  }
};

export const listenToRedisQueue = async (
  redisPubSubInstance: Promise<NodeRedisPubSub>,

  queueName: string,
  callback: (event: any) => Promise<void>,
) => {
  try {
    const redisPubSub = await redisPubSubInstance;

    await redisPubSub.on(queueName, async (message: any) => {
      const event = JSON.parse(message);
      logger.info(`Received message from queue ${queueName}:`, event);
      // Executing the callback function with the event
      await callback(event);
    });
  } catch (error) {
    logger.error(`Error listening to Redis queue ${queueName}:`, error.message);
  }
};
