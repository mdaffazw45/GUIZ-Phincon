const {
  handleServerError,
  handleResponse,
} = require('../helper/responseHandler');
const { Quiz, User, QuizTaker, sequelize } = require('../models');
const { finishQuizValidator } = require('../validators/quizTakerValidator');

exports.getQuizTakersByUserId = async (req, res) => {
  try {
    const userId = req.user.id;
    const quizTakers = await QuizTaker.findAll({
      where: { userId },
      include: [
        {
          model: User,
          as: 'user',
        },
        {
          model: Quiz,
          as: 'quiz',
        },
      ],
    });

    return handleResponse(res, 200, quizTakers);
  } catch (error) {
    return handleServerError(res);
  }
};

exports.getAllUsersTotalScores = async (req, res) => {
  try {
    const userScores = await QuizTaker.findAll({
      attributes: [
        'userId',
        [sequelize.fn('sum', sequelize.col('score')), 'totalScore'],
      ],
      include: [
        {
          model: User,
          as: 'user',
        },
      ],
      group: ['userId'],
    });

    return handleResponse(res, 200, userScores);
  } catch (error) {
    return handleServerError(res);
  }
};

exports.finishQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const userId = req.user.id;
    const { score } = req.body;

    const quiz = await Quiz.findByPk(quizId);

    if (!quiz) {
      return handleResponse(res, 404, { message: 'Quiz not found.' });
    }

    const { error } = finishQuizValidator.validate({ score });
    if (error) {
      return handleResponse(res, 400, { message: error.details[0].message });
    }

    const existingQuizTaker = await QuizTaker.findOne({
      where: {
        userId,
        quizId,
      },
    });

    if (existingQuizTaker) {
      await existingQuizTaker.update({ score });
    } else {
      await QuizTaker.create({
        userId,
        quizId,
        score,
      });
    }

    return handleResponse(res, 200, {
      message: 'Quiz completed successfully.',
    });
  } catch (error) {
    return handleServerError(res);
  }
};
