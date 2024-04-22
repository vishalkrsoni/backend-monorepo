const NRP = require('node-redis-pubsub');
import { Redis } from 'ioredis';
import { logger } from '../store';
import { EventMessage } from '../types/types';
import { NodeRedisPubSub } from 'node-redis-pubsub';

type RedisPubSubInstance = any;

export const emitMessageToRedisTopic = async (
  redisPubSub: Redis,
  topic: string,
  event: EventMessage
) => {
  try {
    await redisPubSub.emit(topic, event);
  } catch (error) {
    logger.error(`Error emitting message to: ${topic}`, error);
  }
};

export const publishToRedisQueue = async (
  redisPubSubInstance: Promise<NodeRedisPubSub>,
  queueName: string,
  message: string
) => {
  try {
    const redisPubSub = await redisPubSubInstance;

    await redisPubSub.publish(queueName, message);
    logger.info(
      `Message published to queue ${queueName}:`,
      JSON.parse(message)
    );
  } catch (error) {
    logger.error('Error publishing message:', error);
  }
};

export const listenToRedisQueue = async (
  redisPubSubInstance: Promise<NodeRedisPubSub>,
  queueName: string,
  callback: (event: any) => Promise<void>
) => {
  try {
    const redisPubSub = await redisPubSubInstance;

    await redisPubSub.on(queueName, async (message: any) => {
      const event = JSON.parse(message);
      logger.info(`Received message from pubsub  queue ${queueName}:`, event);
      // Executing the callback function with the event
      await callback(event);
    });
  } catch (error) {
    logger.error(`Error listening to Redis queue ${queueName}:`, error.message);
  }
};
