'use strict';
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'administrator',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('admin12345', salt),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'ajipriya',
        email: 'ajip@gmail.com',
        password: bcrypt.hashSync('ajip12345', salt),
        role: 'customer',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
