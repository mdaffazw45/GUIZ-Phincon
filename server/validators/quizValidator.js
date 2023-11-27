const Joi = require('joi');
const { createQuestionValidator } = require('./questionValidator');

const createQuizValidator = Joi.object({
  title: Joi.string().required().min(3).max(255),
  description: Joi.string().required().min(3),
  questions: Joi.array().items(createQuestionValidator).min(1).required(),
});

module.exports = { createQuizValidator };
