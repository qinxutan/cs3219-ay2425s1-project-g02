const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const questionRoutes = require('./routes/questionRoutes');
const userRoutes = require('./routes/userRoutes');
const firebaseConfig = require('./config/firebaseConfig');
require('dotenv').config();
const app = express();

// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies

// Session Middleware
app.use(
  session({
    secret: process.env.SECRET_KEY, // Use secret from .env
    resave: false,
    saveUninitialized: true,
  })
);
// Routes
app.use('/', questionRoutes);
app.use('/', userRoutes);

module.exports = app;
