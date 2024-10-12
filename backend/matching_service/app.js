const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const testRoutes = require("./routes/testRoutes");
const firebaseConfig = require("./config/firebaseConfig"); // Ensure Firebase is initialized
const authenticateToken = require("./middleware/authenticateToken");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const { SocketController } = require("./controllers/socketController");
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  },
}).of("/matching");

// Allow requests from http://localhost:3000 (docker compose frontend), and http://localhost:5173 (development frontend) with credentials
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

// Handle preflight requests for all routes
app.options("*", cors());

// Middleware
app.use(authenticateToken); // Verifies user authenticity, stops here if it fails to verify
app.use(bodyParser.json()); // Parse JSON request bodies

// Routes
app.use("/", testRoutes);

const controller = new SocketController();

server.listen(5004, () => {
  console.log("server running at http://localhost:5004");
});

io.on("connection", (socket) => {
  controller.handleConnection(socket);
});

module.exports = app;
