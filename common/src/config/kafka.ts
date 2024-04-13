import { Kafka, logLevel } from 'kafkajs';

const { KAFKA_BROKER, KAFKA_USERNAME, KAFKA_PASSWORD } = process.env;
export const kafka = new Kafka({
  brokers: [KAFKA_BROKER],
  ssl: true,
  sasl: {
    mechanism: 'scram-sha-256',
    username: KAFKA_USERNAME,
    password: KAFKA_PASSWORD,
  },
  logLevel: logLevel.ERROR,
});
