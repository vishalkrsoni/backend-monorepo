import {
  getKafkaConsumer,
  getPubSubClient,
  logger,
} from '@backend-monorepo/common';

// export const kafkaConsumer = getKafkaConsumer('USER_CREATE');
export const pubSubClient = getPubSubClient();
