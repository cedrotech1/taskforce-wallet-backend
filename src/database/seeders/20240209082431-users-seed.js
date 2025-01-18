import bcrypt from "bcrypt";
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash("1234", saltRounds);
    await queryInterface.bulkInsert('User', [
      {
        firstname: 'Cedrick',
        lastname: 'Hakuzimana',
        phone: '1234567890',
        email: 'cedrick@example.com',
        role: 'superadmin',
        password: hashedPassword,
        resetkey: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstname: 'John',
        lastname: 'Doe',
        phone: '0987654321',
        email: 'john@example.com',
        role: 'user',
        password: hashedPassword,
        resetkey: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('User', null, {});
  },
};
