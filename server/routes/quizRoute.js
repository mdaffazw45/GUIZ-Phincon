const express = require('express');
const {
  getAllQuiz,
  getQuizById,
  createQuizWithQuestions,
  deleteQuizById,
  editQuizWithQuestions,
  finishQuiz,
} = require('../controllers/quizController');
const { authentication, authorization } = require('../middlewares/auth');
const router = express.Router();

router.get('/all', getAllQuiz);

router.use(authentication);

router.get('/:quizId', getQuizById);
router.post('/create', authorization, createQuizWithQuestions);
router.put('/edit/:quizId', authorization, editQuizWithQuestions);
router.delete('/delete/:quizId', deleteQuizById);

module.exports = router;
