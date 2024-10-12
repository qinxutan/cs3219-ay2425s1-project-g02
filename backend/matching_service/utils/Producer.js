const ampq = require("amqplib");

export class Producer {
  constructor(queue) {
    this.queue = queue; // queue name
    this.connect();
  }

  async connect() {
    this.connection = await ampq.connect(
      process.env.RABBITMQ_URL || "amqp://localhost:5672"
    );

    this.channel = await this.connection.createChannel();

    this.channel.assertQueue(queue, {
      durable: false,
    });
    console.log(
      `${this.queue}: Connected to RabbitMQ and channel created successfully.`
    );
  }

  sendToQueue(message) {
    this.channel.sendToQueue(this.queue, Buffer.from(JSON.stringify(message)));
  }

  async close() {
    await this.channel.close();
    await this.connection.close();
  }
}
