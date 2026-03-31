'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'tasks',
      [
        {
          body: 'To do hw',
          deadline: '2026-04-04',
          user_id: 10,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          body: 'Walk',
          deadline: '2026-05-05',
          user_id: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          body: 'To do hw',
          deadline: '2026-06-06',
          user_id: 14,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tasks', null, {});
  },
};
