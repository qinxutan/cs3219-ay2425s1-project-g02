import { QueueService } from "../services/QueueService";

const queueService = new QueueService();

const handleMatching = (req, res) => {
  const { uid, difficulty, topic } = matchingData;
  const queueName = queueService.getQueueName(difficulty, topic);

  // Case 1: Double tab and match in both table
  // Case 2: User cancels session
  // Solution: Check if the user is already in any of the queue
  queueService.removeUserFromAllQueues(uid);
  // Publish

  // Case 2: User is already in a session
  // Solution: Check if user in matchedUsers in collab service (if user is in matchedUsers, return 400)

  // Attempt to matchUser in the selected queue
  queueService.matchUser(queueName, uid);

  // Case 3: User couldnt find match in 30 seconds
  // Solution: Remove user from the queue (only in the queue matched in during this request)
  setTimeout(() => {
    queueService.removeUserFromQueue(queueName, uid);
    console.log(`User ${uid} removed from queue ${queueName}`);
  }, 30000);

  const cancelMatching = async () => {
    const { uid, difficulty, topic } = matchingData;
    const queueName = queueService.getQueueName(difficulty, topic);

    queueService.removeUserFromQueue(queueName, uid);
    console.log(`User ${uid} removed from queue ${queueName}`);
    return res.status(200).json({ message: "Matching cancelled" });
  };
};
