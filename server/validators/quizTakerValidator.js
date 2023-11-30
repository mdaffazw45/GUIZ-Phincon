const Joi = require('joi');

const finishQuizValidator = Joi.object({
  score: Joi.number().required().messages({
    'any.required': 'Score is required',
  }),
});

module.exports = { finishQuizValidator };
