const Joi = require('joi');

const createQuestionValidator = Joi.object({
  content: Joi.string().required().min(3).max(255).messages({
    'string.min': 'The question must be at least {#limit} characters long',
    'string.empty': 'The question is required',
  }),
  answer: Joi.string().required().min(4).max(255).messages({
    'string.empty': 'Answer is required',
    'string.min': 'The shortest name of a country is {#limit} characters long',
  }),
});

const editQuestionValidator = Joi.object({
  id: Joi.number().optional(),
  content: Joi.string().required().min(3).max(255).messages({
    'string.min': 'The question must be at least {#limit} characters long',
    'string.empty': 'The question is required',
  }),
  answer: Joi.string().required().min(4).max(255).messages({
    'string.empty': 'Answer is required',
    'string.min': 'The shortest name of a country is {#limit} characters long',
  }),
});

module.exports = {
  createQuestionValidator,
  editQuestionValidator,
};
