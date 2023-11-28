const express = require('express');
const {
  getAllQuiz,
  getQuizById,
  createQuizWithQuestions,
  deleteQuizById,
} = require('../controllers/quizController');
const { authentication, authorization } = require('../middlewares/auth');
const router = express.Router();

router.get('/all', getAllQuiz);
router.use(authentication);
router.get('/:quizId', getQuizById);
router.post('/create', authorization, createQuizWithQuestions);
router.delete('/delete/:quizId', deleteQuizById);

module.exports = router;
