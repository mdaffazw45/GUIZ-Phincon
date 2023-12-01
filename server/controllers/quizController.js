const { Op } = require('sequelize');
const {
  handleServerError,
  handleResponse,
} = require('../helper/responseHandler');
const { Quiz, Question, QuizTaker, sequelize } = require('../models');
const {
  createQuizValidator,
  editQuizValidator,
} = require('../validators/quizValidator');
const redisClient = require('../utils/redisClient');

const REDIS_KEY_QUIZZES = 'quizzes';
const REDIS_KEY_QUIZ = 'quiz:';
const REDIS_KEY_QUESTIONS = 'questions:';

exports.getAllQuiz = async (req, res) => {
  try {
    const cachedQuizzes = await redisClient.get(REDIS_KEY_QUIZZES);
    if (cachedQuizzes) {
      return handleResponse(res, 200, JSON.parse(cachedQuizzes));
    } else {
      const quizzes = await Quiz.findAll({ order: [['createdAt', 'DESC']] });
      await redisClient.set(
        REDIS_KEY_QUIZZES,
        JSON.stringify(quizzes),
        'EX',
        3600
      );
      return handleResponse(res, 200, quizzes);
    }
  } catch (error) {
    return handleServerError(res);
  }
};

exports.getQuizById = async (req, res) => {
  try {
    const { quizId } = req.params;
    const cacheKey = `${REDIS_KEY_QUIZ}${quizId}`;
    const questionsCacheKey = `${REDIS_KEY_QUESTIONS}${quizId}`;

    const cachedQuiz = await redisClient.get(cacheKey);
    const cachedQuestions = await redisClient.get(questionsCacheKey);
    // Redis can't store nested object, so we split into two then parse them, then combine them
    if (cachedQuiz && cachedQuestions) {
      const parsedQuiz = JSON.parse(cachedQuiz);
      const parsedQuestions = JSON.parse(cachedQuestions);
      parsedQuiz.questions = parsedQuestions;
      return handleResponse(res, 200, parsedQuiz);
    }

    const quiz = await Quiz.findByPk(quizId, {
      include: [
        {
          model: Question,
          as: 'questions',
        },
      ],
    });
    if (!quiz) {
      return handleResponse(res, 404, { message: 'Quiz not found. ' });
    }

    await redisClient.set(cacheKey, JSON.stringify(quiz), 'EX', 1800);

    await redisClient.set(
      questionsCacheKey,
      JSON.stringify(quiz.questions),
      'EX',
      1800
    );

    return handleResponse(res, 200, quiz);
  } catch (error) {
    return handleServerError(res);
  }
};

exports.createQuizWithQuestions = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const quizData = req.body;
    const userId = req.user.id;
    const { error, value } = createQuizValidator.validate(quizData);
    if (error) {
      return handleResponse(res, 400, { message: error.details[0].message });
    }
    const { title, description, questions } = value;

    const quiz = await Quiz.create(
      {
        title,
        description,
        noOfQuestions: questions.length,
        userId,
      },
      { transaction: t }
    );

    const createdQuestions = questions.map((question) => ({
      ...question,
      quizId: quiz.id,
    }));

    await Question.bulkCreate(createdQuestions, { transaction: t });

    await t.commit();

    await redisClient.del(REDIS_KEY_QUIZZES);

    return handleResponse(res, 201, {
      quiz,
      questions: createdQuestions,
      message: 'Quiz successfully created!',
    });
  } catch (error) {
    await t.rollback();
    return handleServerError(res);
  }
};

exports.editQuizWithQuestions = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { quizId } = req.params;
    const updatedQuizData = req.body;
    const { error, value } = editQuizValidator.validate(updatedQuizData);
    if (error) {
      return handleResponse(res, 400, { message: error.details[0].message });
    }
    const { title, description, questions } = value;

    // Update Quiz
    const quiz = await Quiz.findByPk(quizId, { transaction: t });
    if (!quiz) {
      await t.rollback();
      return handleResponse(res, 404, { message: 'Quiz not found.' });
    }
    quiz.title = title;
    quiz.description = description;
    quiz.noOfQuestions = questions.length;
    await quiz.save({ transaction: t });

    // Update Existing Questions
    const existingQuestionIds = questions.filter((q) => q.id).map((q) => q.id);

    const existingQuestions = await Question.findAll({
      where: {
        quizId,
        id: existingQuestionIds,
      },
      transaction: t,
    });

    for (const question of existingQuestions) {
      const updatedQuestion = questions.find((q) => q.id === question.id);
      question.content = updatedQuestion.content;
      question.answer = updatedQuestion.answer;
      await question.save({ transaction: t });
    }

    // Delete Removed Questions
    if (existingQuestionIds.length > 0) {
      await Question.destroy({
        where: {
          quizId,
          id: { [Op.notIn]: existingQuestionIds },
        },
        transaction: t,
      });
    }

    // Add New Questions
    const newQuestions = questions
      .filter((q) => !q.id)
      .map((question) => ({
        ...question,
        quizId,
      }));
    if (newQuestions.length > 0) {
      await Question.bulkCreate(newQuestions, {
        transaction: t,
      });
    }

    await t.commit();

    if (quiz) {
      await redisClient.set(
        `${REDIS_KEY_QUIZ}${quizId}`,
        JSON.stringify(quiz),
        'EX',
        1800
      );

      const updatedQuestions = await Question.findAll({
        where: { quizId },
      });
      await redisClient.set(
        `${REDIS_KEY_QUESTIONS}${quizId}`,
        JSON.stringify(updatedQuestions),
        'EX',
        1800
      );
    }

    const allQuizzes = await Quiz.findAll({ order: [['createdAt', 'DESC']] });
    await redisClient.set(
      REDIS_KEY_QUIZZES,
      JSON.stringify(allQuizzes),
      'EX',
      3600
    );

    return handleResponse(res, 200, {
      quiz,
      message: 'Quiz successfully updated!',
    });
  } catch (error) {
    await t.rollback();
    return handleServerError(res);
  }
};

exports.deleteQuizById = async (req, res) => {
  try {
    const quizId = req.params.quizId;

    const quizToDelete = await Quiz.findByPk(quizId);

    if (!quizToDelete) {
      return handleResponse(res, 404, {
        message: 'Quiz not found',
      });
    }
    await quizToDelete.destroy();

    await redisClient.del(`${REDIS_KEY_QUIZ}${quizId}`);
    await redisClient.del(REDIS_KEY_QUIZZES);

    return handleResponse(res, 200, { message: 'Quiz deleted successfully' });
  } catch (error) {
    return handleServerError(res);
  }
};
