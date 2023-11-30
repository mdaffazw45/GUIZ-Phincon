'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'Questions',
      [
        {
          content: 'Which country is known as the Land of the Rising Sun?',
          answer: 'Japan',
          quizId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content:
            'Which country has a city that was once called Constantinople?',
          answer: 'Turkey',
          quizId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content:
            'The Great Barrier Reef is located off the coast of which country?',
          answer: 'Australia',
          quizId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: 'Which country is famous for its tulips and windmills?',
          answer: 'Netherlands',
          quizId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: 'Mount Kilimanjaro is located in which African country?',
          answer: 'Tanzania',
          quizId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: 'Find China',
          answer: 'China',
          quizId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: 'Find Russia',
          answer: 'Russia',
          quizId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: 'Find Australia',
          answer: 'Australia',
          quizId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: 'Find Indonesia',
          answer: 'Indonesia',
          quizId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          content: 'Find The United States of America',
          answer: 'United States of America',
          quizId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Questions', null, {});
  },
};
