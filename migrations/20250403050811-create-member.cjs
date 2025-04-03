"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("members", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      memberName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      roleName: {
        type: Sequelize.ENUM("Development", "Testing", "Production", "Marketing"),
        allowNull: false
      },
      MeetingDetailId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "meetingdetails",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("members");
  }
};
