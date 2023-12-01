const express = require('express');
const {
  getAllUsersTotalScores,
  finishQuiz,
  getQuizTakersByUserId,
} = require('../controllers/quizTakerController');
const { authentication } = require('../middlewares/auth');
const router = express.Router();

router.use(authentication);

router.get('/', getQuizTakersByUserId);
router.get('/all/score', getAllUsersTotalScores);
router.post('/finish/:quizId', finishQuiz);

module.exports = router;
