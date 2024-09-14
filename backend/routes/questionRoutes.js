const express = require('express');
const { getAllQuestions, createQuestion, deleteQuestion } = require('../controllers/questionController');
const router = express.Router();

// Route to get all questions (homepage)
router.get('/get-all-questions', getAllQuestions);

// Route to create a new question
router.post('/create-question', createQuestion);

// Route to delete a question
router.delete('/', deleteQuestion);

module.exports = router;
