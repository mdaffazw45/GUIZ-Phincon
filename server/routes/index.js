const express = require('express');
const authRoute = require('./authRoute');
const userRoute = require('./userRoute');
const quizRoute = require('./quizRoute');
const quizTakerRoute = require('./quizTakerRoute');
const router = express.Router();

router.use('/auth', authRoute);
router.use('/user', userRoute);
router.use('/quiz', quizRoute);
router.use('/taker', quizTakerRoute);

module.exports = router;
