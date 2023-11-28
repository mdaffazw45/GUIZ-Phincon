const {
  handleServerError,
  handleResponse,
} = require('../helper/responseHandler');
const { Quiz, Question, sequelize } = require('../models');
const { createQuizValidator } = require('../validators/quizValidator');

exports.getAllQuiz = async (req, res) => {
  try {
    const quizzes = await Quiz.findAll({ order: [['createdAt', 'DESC']] });
    return handleResponse(res, 200, quizzes);
  } catch (error) {
    return handleServerError(res);
  }
};

exports.getQuizById = async (req, res) => {
  try {
    const { quizId } = req.params;
    const quiz = await Quiz.findByPk(quizId, {
      include: [
        {
          model: Question,
          as: 'questions',
        },
      ],
    });
    if (!quiz) {
      return handleResponse(res, 404, { message: 'Quiz not found.' });
    }
    return handleResponse(res, 200, quiz);
  } catch (error) {
    return handleServerError(res);
  }
};

//TODO: Uncomment userId when authentication middleware is created
exports.createQuizWithQuestions = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const quizData = req.body;
    //const userId = req.user.id
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
        //userId,
      },
      { transaction: t }
    );

    const createdQuestions = questions.map((question) => ({
      ...question,
      quizId: quiz.id,
    }));

    await Question.bulkCreate(createdQuestions, { transaction: t });

    await t.commit();
    return handleResponse(res, 201, { quiz, questions: createdQuestions });
  } catch (error) {
    await t.rollback();
    console.error(error);
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

    return handleResponse(res, 200, { message: 'Quiz deleted successfully' });
  } catch (error) {
    console.log(error);
    return handleServerError(res);
  }
};
