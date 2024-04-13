import { kafka } from '../config/kafka';
// import { logger } from './logger';
import { logger } from '../store';

const consumer = kafka.consumer({ groupId: 'my-kafka' });

const msgToObj = (msg: string) => {
  try {
    return JSON.parse(msg);
  } catch (err) {
    console.log('err', msg);
    return null;
  }
};

export async function startKafkaConsumer(topic: string): Promise<any> {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        logger.info('received KAFKA message for topic : ${topic}');
        const obj = msgToObj(message.value.toString());
        if (obj) {
          console.log('Check my object', obj);
          if (obj.type === 'USER_CREATE') {
            logger.info(`user create event received : ${obj.data.userName}`);
          } else if (obj.type === 'USER_Logged') {
            logger.info(`user logged received : ${obj.data.userName}`);
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
}

function sendEmailNotification(message: any): void {
  // TODO: email sending logic here
  logger.info('Sending email notification:');
}
