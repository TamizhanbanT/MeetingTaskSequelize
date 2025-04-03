"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("members", [
      {
        memberName: "Alice",
        roleName: "Development",
        MeetingDetailId: 1, // Ensure this MeetingDetailId exists in the meetingdetails table
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        memberName: "Bob",
        roleName: "Testing",
        MeetingDetailId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        memberName: "Charlie",
        roleName: "Production",
        MeetingDetailId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        memberName: "David",
        roleName: "Marketing",
        MeetingDetailId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        memberName: "Eve",
        roleName: "Development",
        MeetingDetailId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        memberName: "Frank",
        roleName: "Testing",
        MeetingDetailId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("members", null, {});
  }
};
