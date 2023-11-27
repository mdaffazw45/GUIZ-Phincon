const Joi = require('joi');

const createQuestionValidator = Joi.object({
  content: Joi.string().required().min(3).max(255),
  answer: Joi.string().required().min(1).max(255),
});

module.exports = {
  createQuestionValidator,
};
