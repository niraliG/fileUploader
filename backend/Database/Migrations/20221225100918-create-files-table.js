"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("file", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      fileName: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("file");
  },
};
