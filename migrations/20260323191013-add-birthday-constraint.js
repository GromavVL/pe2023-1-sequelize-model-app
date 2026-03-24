'use strict';

const { Op } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('users', {
      fields: ['birsday'],
      type: 'check',
      where: {
        birsday: {
          [Op.lte]: Sequelize.literal('CURRENT_DATE'),
        },
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('users', 'users_birsday_check');
  },
};
