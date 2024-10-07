const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = require("./app");
const server = http.createServer(app);
<<<<<<< HEAD
=======
const { db } = require('./config/firebaseConfig');
>>>>>>> 80b7562d0191c8a050afc6db7863192fc1bd39a0

const io = socketIo(server, {
    cors: {
      origin: ['http://localhost:3000', 'http://localhost:5173'], // Frontend origins
      methods: ['GET', 'POST'],
      credentials: true // Allow cookies/credentials if needed
    }
  });

const collabRoutes = require('./routes/collabRoutes');
app.use(express.json());
app.use('/', collabRoutes);

// Handle new socket connections
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('error', (err) => {
    console.error('Socket error:', err);
  });

  // Joining a specific collaboration session
  socket.on('joinSession', ({ sessionId, userId }) => {
    socket.join(sessionId);
    console.log(`User ${userId} joined session ${sessionId}`);
<<<<<<< HEAD
    userId = socket.id;
=======
    socket.userId = userId;
>>>>>>> 80b7562d0191c8a050afc6db7863192fc1bd39a0

    // Emit the sessionId and userId back to the client
    socket.emit('sessionJoined', { sessionId, userId });
});

  // Handle real-time code updates
  socket.on('codeUpdate', (data) => {
    const { sessionId, code } = data;
    // Broadcast the code update to all users in the same session
    socket.to(sessionId).emit('codeUpdated', { code });
    console.log(`Code updated in session ${sessionId}: ${code}`);
  });

  socket.on('sendMessage', (data) => {
    const { sessionId, message } = data;
    io.to(sessionId).emit('messageReceived', {
<<<<<<< HEAD
      username: socket.id,
=======
      username: socket.userId, // Use userId instead of socket.id
>>>>>>> 80b7562d0191c8a050afc6db7863192fc1bd39a0
      message
    });
  });

  socket.on('terminateSession', (sessionId) => {
    // Notify all users in the session except the one who terminated it
<<<<<<< HEAD
    socket.to(sessionId).emit('sessionTerminated', { userId: socket.id });
=======
    socket.to(sessionId).emit('sessionTerminated', { userId: socket.userId });

    // Optionally, you can terminate the session by removing it from the database
    db.collection('sessions').doc(sessionId).delete()
        .then(() => {
            console.log(`Session ${sessionId} terminated by user ${userId}`);
        })
        .catch((error) => {
            console.error('Error terminating session:', error);
        });
>>>>>>> 80b7562d0191c8a050afc6db7863192fc1bd39a0
});

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

const port = 5004;

server.listen(5004, (err) => {
  if (err) {
    console.error('Error starting server:', err);
    return;
  }
  console.log(`Server is running on port ${port}`);
  console.log('Listening for WebSocket connections...');
});

module.exports = { io };
