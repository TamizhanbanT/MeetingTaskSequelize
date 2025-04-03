"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("meetingdetails", [
      {
        meetingRole: "Development",
        meetingDate: "2025-04-02",
        meetingTime: "10:00:00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        meetingRole: "Testing",
        meetingDate: "2025-04-03",
        meetingTime: "11:00:00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        meetingRole: "Production",
        meetingDate: "2025-04-04",
        meetingTime: "12:00:00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        meetingRole: "Marketing",
        meetingDate: "2025-04-05",
        meetingTime: "14:00:00",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("meetingdetails", null, {});
  },
};
