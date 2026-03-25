'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          first_name: 'John',
          last_name: 'Doe',
          email: 'm@m4.com',
          password_hash: '1234',
          birsday: '2020-10-20',
          gender: 'male',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          first_name: 'Test',
          last_name: 'Testovych',
          email: 'm@m3.com',
          password_hash: '1234',
          birsday: '2020-11-21',
          gender: 'male',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
