import { KafkaClass } from '../clients';
import { getKafkaConfig } from '../config/kafka';
import { kafkaProducer, logger } from '../store';

// const kafkaConfig = getKafkaConfig();
// const kafka = new KafkaClass(kafkaConfig);
// const kafkaClient = kafka.getClient();
// const kafkaProducer = kafka.getProducer();

export async function sendToKafka(
  topic: string,
  message: string,
): Promise<void> {
  try {
    await kafkaProducer.connect();
    const messageToKafka = await kafkaProducer.send({
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
    await kafkaProducer.disconnect();
  }
}
