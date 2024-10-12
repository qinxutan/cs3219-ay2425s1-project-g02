import { Difficulty } from "../models/QuestionData";
import { Topic } from "../models/QuestionData";
import { Queue } from "../utils/Queue";

export class QueueService {
  constructor() {
    this.queues = new Map();

    // Create a queue for each difficulty and topic pair
    for (const difficulty in Object.values(Difficulty)) {
      for (const topic in Object.values(Topic)) {
        const queueName = `${difficulty}_${topic}`;
        this.queues.set(queueName, new Queue(queueName, difficulty, topic));
      }
    }
  }

  getQueue(queueName) {
    return this.queues.get(queueName);
  }

  getQueueName(difficulty, topic) {
    return `${difficulty}_${topic}`;
  }

  close() {
    this.queues.forEach((queue) => {
      queue.close();
    });
  }
}
