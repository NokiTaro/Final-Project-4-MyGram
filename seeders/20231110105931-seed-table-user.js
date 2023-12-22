'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users",[
      {
        full_name: "Ridho Triadilaksono",
        email: "ridho2@gmail.com",
        username: "ridho123",
        password: "rahasia23",
        profile_image_url: "https://ridho.image./id/1",
        age: 21,
        phone_number: "087623145623",
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete("Users", null, {});
  }
};
