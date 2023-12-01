'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Quiz extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Quiz.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      Quiz.hasMany(models.Question, {
        as: 'questions',
        foreignKey: 'quizId',
        onDelete: 'CASCADE',
      });
      Quiz.belongsToMany(models.User, {
        as: 'takers',
        foreignKey: 'quizId',
        through: models.QuizTaker,
      });
    }
  }
  Quiz.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      noOfQuestions: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Quiz',
    }
  );
  return Quiz;
};
