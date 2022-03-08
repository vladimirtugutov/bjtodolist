const bcrypt = require('bcrypt');

const createPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        login: 'admin',
        password: await createPassword('123'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
    await queryInterface.bulkInsert('Todos', [
      {
        userName: 'Алекс',
        email: 'alex@gmail.com',
        text: 'подготовить отчет',
        status: false,
        edited: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userName: 'Билл',
        email: 'bill@gmail.com',
        text: 'проверить данные',
        status: false,
        edited: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userName: 'Уилл',
        email: 'will@gmail.com',
        text: 'принять отчет',
        status: false,
        edited: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userName: 'Джейн',
        email: 'jane@gmail.com',
        text: 'провести код-ревью',
        status: false,
        edited: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Todos', null, {});
  },
};
