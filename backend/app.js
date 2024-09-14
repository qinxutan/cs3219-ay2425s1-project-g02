const express = require('express');
const bodyParser = require('body-parser');
const questionRoutes = require('./routes/questionRoutes');
const firebaseConfig = require('./config/firebaseConfig'); // Ensure Firebase is initialized
const app = express();

// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies

// Routes
app.use('/', questionRoutes);

module.exports = app;
