"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("meetingdetails", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      meetingRole: {
        type: Sequelize.ENUM("Development", "Testing", "Production", "Marketing"),
        allowNull: false,
      },
      meetingDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      meetingTime: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("meetingdetails");
  },
};
