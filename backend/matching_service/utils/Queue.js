import { Producer } from "./producer";

export class Queue {
  constructor(queueName, difficulty, topic) {
    this.queueName = queueName;

    this.difficulty = difficulty;
    this.topic = topic;

    this.producer = new Producer(queueName);
  }

  async createSession(userA, userB) {
    const sessionData = {
      users: [userA, userB],
      difficulty: this.difficulty,
      topic: this.topic,
      // question: Question
    };

    // TODO: Logic to create Session

    const sessionId = 1; // Placeholder

    return sessionId;
  }

  async close() {
    this.producer.close();
  }
}
