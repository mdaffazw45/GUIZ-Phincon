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
        {
          title: 'Find The Country (Easy)',
          description:
            'If you at least have basic knowledge of geography, you should be able to pass this one.',
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
