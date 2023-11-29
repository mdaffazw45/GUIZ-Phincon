const express = require('express');
const authRoute = require('./authRoute');
const userRoute = require('./userRoute')
const quizRoute = require('./quizRoute');
const router = express.Router();

router.use('/auth', authRoute);
router.use('/user', userRoute);
router.use('/quiz', quizRoute);

module.exports = router;
