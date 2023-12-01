'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuizTaker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      QuizTaker.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'userId',
      });

      // Associate with the Quiz model
      QuizTaker.belongsTo(models.Quiz, {
        as: 'quiz',
        foreignKey: 'quizId',
      });
    }
  }
  QuizTaker.init(
    {
      userId: DataTypes.INTEGER,
      quizId: DataTypes.INTEGER,
      score: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'QuizTaker',
    }
  );
  return QuizTaker;
};
