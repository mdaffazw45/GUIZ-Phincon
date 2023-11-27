const express = require('express');
const authRoute = require('./authRoute');
const quizRoute = require('./quizRoute');
const router = express.Router();

router.use('/auth', authRoute);
router.use('/quiz', quizRoute);

module.exports = router;
