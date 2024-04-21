import { Kafka, logLevel, KafkaConfig, Consumer, Producer } from 'kafkajs';

export class KafkaClass {
  private instance: Kafka;
  private consumer: Consumer;
  private producer: Producer;

  constructor(private config: KafkaConfig) {
    this.instance = new Kafka(config);
    this.consumer = this.instance.consumer({ groupId: 'my-kafka' });
    this.producer = this.instance.producer();
  }

  public getInstance(): Kafka {
    return this.instance;
  }

  public getConsumer(): Consumer {
    return this.consumer;
  }
  public getProducer(): Producer {
    return this.producer;
  }
}
