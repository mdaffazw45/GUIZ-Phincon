const express = require('express');
const {
  getAllQuizTakers,
  getAllUsersTotalScores,
  finishQuiz,
} = require('../controllers/quizTakerController');
const { authentication } = require('../middlewares/auth');
const router = express.Router();

router.use(authentication);

router.get('/all', getAllQuizTakers);
router.get('/all/score', getAllUsersTotalScores);
router.post('/finish/:quizId', finishQuiz);

module.exports = router;
