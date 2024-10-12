const ampq = require("amqplib");

export class Consumer {
  constructor(queue, callback) {
    this.queue = queue; // queue name
    this.callback = callback; // callback function to be called when a message is received
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

  async consume() {
    this.channel.consume(this.queue, async (message) => {
      await this.callback(JSON.parse(message.content.toString()));
    });

    this.channel.ack(message);
  }
}
