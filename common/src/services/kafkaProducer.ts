import { kafka } from '../config/kafka';
import { logger } from '../store';

const producer = kafka.producer();
export async function sendToKafka(
  topic: string,
  message: string
): Promise<void> {
  try {
    await producer.connect();
    const messageToKafka = await producer.send({
      topic,
      messages: [{ value: message }],
    });
    if (messageToKafka)
      logger.info('Message sent successfully to Kafka:', message.toString());
    else logger.error('Sending to Kafka failed');
  } catch (error) {
    logger.error('Error sending message to Kafka:', error);
    // throw error;
  } finally {
    await producer.disconnect();
  }
}
