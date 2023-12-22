'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("SocialMedia",[
      {
        name: "Social Media Dimas",
        social_media_url: "@dimas",
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 8
      }
    ],{})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("SocialMedia", null, {})
  }
};
