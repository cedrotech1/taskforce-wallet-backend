'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Account', [
      {
        userId: 1, // User Cedrick
        accountType: 'checking',
        name: 'equiy',
        balance: 1000.00,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2, // User John
        accountType: 'savings',
        name: 'bk',
        balance: 5000.00,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Account', null, {});
  },
};
