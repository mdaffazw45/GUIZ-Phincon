const express = require('express');
const {
  getAllQuiz,
  getQuizById,
  createQuizWithQuestions,
} = require('../controllers/quizController');
const { authentication, authorization } = require('../middlewares/auth')
const router = express.Router();

router.get('/all', getAllQuiz);
router.use(authentication)
router.get('/:quizId', getQuizById);
router.post('/create', authorization, createQuizWithQuestions);

module.exports = router;
