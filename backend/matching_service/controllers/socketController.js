const { QueueService } = require("../services/QueueService");
const TIMEOUT_TIME = 30000;

class SocketController {
  constructor() {
    this.socketMap = new Map();
    this.queueService = new QueueService(this.socketMap);
  }

  handleConnection(socket) {
    // socket.emit("connected", () =>
    //   console.log("Connected to matching service")
    // );

    socket.on("startMatching", (data) =>
      this.handleStartMatching(socket, data)
    );

    socket.on("cancelMatching", (uid) => this.handleCancelMatching(uid));
  }

  handleStartMatching(socket, { uid, difficulty, topic }) {
    this.emitDoubleMatchingRequest(uid);
    this.removeExistingConnection(uid); // Remove any existing connections for this user

    // Add the socket to the map
    const queueName = this.queueService.getQueueName(difficulty, topic);
    this.socketMap.set(uid, { socket, queueName });

    const sessionData = this.queueService.matchUser(queueName, uid);
    if (sessionData) this.handleMatching(sessionData);

    // Set a timeout for matching
    setTimeout(() => this.handleTimeout(socket, uid), TIMEOUT_TIME);
  }

  handleCancelMatching(uid) {
    this.removeExistingConnection(uid);
  }

  handleMatching(sessionData) {
    const { prevUserSessionData, currUserSessionData } = sessionData;

    const prevUserSocket = this.socketMap.get(prevUserSessionData.uid).socket;
    const currUserSocket = this.socketMap.get(currUserSessionData.uid).socket;

    prevUserSocket.emit("matched", prevUserSessionData);
    currUserSocket.emit("matched", currUserSessionData);

    prevUserSocket.disconnect();
    currUserSocket.disconnect();
  }

  handleTimeout(socket, uid) {
    if (!socket.disconnected) {
      socket.emit("matchmakingTimedOut", `Matchmaking timed out after ${TIMEOUT_TIME / 1000}s`);
      console.log(`timed out after ${TIMEOUT_TIME / 1000}s`);

      this.removeExistingConnection(uid);
    }
  }

  emitDoubleMatchingRequest(uid) {
    const socketData = this.socketMap.get(uid);
    if (!socketData) return;

    const { socket, queueName } = socketData;
    socket.emit("doubleMatchingRequest", "Double matching request detected, stopping current tab's matching request")
  }

  removeExistingConnection(uid) {
    console.log("Removing Existing Connection for User:", uid);

    const socketData = this.socketMap.get(uid);
    if (!socketData) return;

    const { socket, queueName } = socketData;

    this.queueService.removeUserFromQueue(queueName, uid);
    this.socketMap.delete(uid);

    socket.disconnect();
  }

  findUidBySocket(socket) {
    for (const [uid, socketData] of this.socketMap.entries()) {
      if (socketData.socket === socket) {
        return uid;
      }
    }
    return null;
  }
}

module.exports = { SocketController };
