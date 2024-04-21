import { Kafka, logLevel, KafkaConfig } from 'kafkajs';

export const getKafkaConfig = (): KafkaConfig => {
  const kafkaEnv = process.env.KAFKA_ENV;
  const kafkaConfig: KafkaConfig = {
    brokers:
      kafkaEnv === 'local'
        ? [process.env.KAFKA_BROKERS_LOCAL]
        : [process.env.KAFKA_BROKER],
    logLevel: logLevel.ERROR,
  };

  if (kafkaEnv !== 'local') {
    kafkaConfig.ssl = true;
    kafkaConfig.sasl = {
      mechanism: 'scram-sha-256',
      username: process.env.KAFKA_USERNAME,
      password: process.env.KAFKA_PASSWORD,
    };
  }

  return kafkaConfig;
};
