const Joi = require('joi');
const {
  createQuestionValidator,
  editQuestionValidator,
} = require('./questionValidator');

const createQuizValidator = Joi.object({
  title: Joi.string().required().min(3).max(255).messages({
    'string.empty': 'Title is required',
  }),
  description: Joi.string().required().min(3).messages({
    'string.empty': 'Description is required',
  }),
  questions: Joi.array()
    .items(createQuestionValidator)
    .min(1)
    .required()
    .messages({
      'any.required': 'Questions is required',
    }),
});

const editQuizValidator = Joi.object({
  title: Joi.string().required().min(3).max(255).messages({
    'string.empty': 'Title is required',
  }),
  description: Joi.string().required().min(3).messages({
    'string.empty': 'Description is required',
  }),
  questions: Joi.array()
    .items(editQuestionValidator)
    .min(1)
    .required()
    .messages({
      'any.required': 'Questions are required',
    }),
});

module.exports = { createQuizValidator, editQuizValidator };
