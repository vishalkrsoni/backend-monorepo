import { kafka } from '../config/kafka';

export const getKafkaConsumer = (groupId: string) =>
  kafka.consumer({ groupId });

export const getKafkaProducer = () => kafka.producer();
