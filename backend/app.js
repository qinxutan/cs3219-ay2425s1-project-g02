const cors = require("cors"); // By pass cors restrictions
const express = require("express");
const bodyParser = require("body-parser");
const questionRoutes = require("./routes/questionRoutes");
const firebaseConfig = require("./config/firebaseConfig"); // Ensure Firebase is initialized
const app = express();

// Allow requests from http://localhost:5173
// app.use(cors({
//   origin: 'http://localhost:5173'
// }));

app.use(cors()); // Allow requests from all origins

// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies

// Routes
app.use("/", questionRoutes);

module.exports = app;
