import { Producer, Consumer } from 'kafkajs';
import { logger } from '../store';
import { parseMessageToObject } from '../utils/parseMessage';

export const publishEventToKafka = async (
  kafkaProducer: Producer,
  topic: string,
  event: Event,
): Promise<void> => {
  try {
    await kafkaProducer.connect();
    const published = await kafkaProducer.send({
      topic,
      messages: [{ value: JSON.stringify(event) }],
    });
    if (!published)
      logger.error('Could not publish event due to  unknown failure');
    logger.info('Message sent successfully to Kafka:', event.toString());
  } catch (error) {
    logger.error('Error while publishing event to Kafka:', error);
    throw error;
  } finally {
    await kafkaProducer.disconnect();
  }
};

export const consumeEventsFromKafka = async (
  kafkaConsumer: Consumer,
  topic: string,
): Promise<void> => {
  try {
    await kafkaConsumer.connect();
    await kafkaConsumer.subscribe({ topic, fromBeginning: true });

    await kafkaConsumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        logger.info(`Received KAFKA message for topic: ${topic}`);
        const obj = parseMessageToObject(message.value.toString());
        if (obj) {
          console.log('Check my object', obj);
          if (obj.type === 'USER_CREATE') {
            logger.info(`User create event received: ${obj.data.userName}`);
          } else if (obj.type === 'USER_Logged') {
            logger.info(`User logged event received: ${obj.data.userName}`);
          }
        }
        sendEmailNotification(message);
      },
    });
    logger.info('Kafka consumer started successfully');
  } catch (error) {
    logger.error('Error starting Kafka consumer:', error);
    throw error;
  }
};

const sendEmailNotification = (message: any) => {
  // TODO: email sending logic here
  logger.info('Sending email notification:');
  return message;
};
