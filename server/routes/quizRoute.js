const express = require('express');
const {
  getAllQuiz,
  getQuizById,
  createQuizWithQuestions,
} = require('../controllers/quizController');
const router = express.Router();

router.get('/all', getAllQuiz);
router.get('/:quizId', getQuizById);
router.post('/create', createQuizWithQuestions);

module.exports = router;
