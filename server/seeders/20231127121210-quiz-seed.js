'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'Quizzes',
      [
        {
          title: 'Global Landmarks and Historical Mysteries',
          description:
            'Test your knowledge of world-famous landmarks, historical sites, and natural wonders.',
          noOfQuestions: 5,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Quizzes', null, {});
  },
};
