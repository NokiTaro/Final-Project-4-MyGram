'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Photos",[
      {
        title: "This is a photo",
        caption: "This is a photo caption",
        poster_image_url: "https://example.com/photo.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Photos", null, {});
  }
};
