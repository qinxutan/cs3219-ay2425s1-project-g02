const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);

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
  socket.on('joinSession', (sessionId) => {
    socket.join(sessionId);
    console.log(`User ${socket.id} joined session ${sessionId}`);
  });

  // Handle real-time code updates
  socket.on('codeUpdate', (data) => {
    const { sessionId, code } = data;
    // Broadcast the code update to all users in the same session
    socket.to(sessionId).emit('codeUpdated', { code });
    console.log(`Code updated in session ${sessionId}: ${code}`);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

server.listen(5001, (err) => {
  if (err) {
    console.error('Error starting server:', err);
    return;
  }
  console.log('Server is running on port 5001');
  console.log('Listening for WebSocket connections...');
});

module.exports = { io };
