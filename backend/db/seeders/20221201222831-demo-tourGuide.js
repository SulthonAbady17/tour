'use strict';

const { v4: uuidv4 } = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert("TourGuides", [
      {
        id: uuidv4(),
        firstName: "Kevin",
        lastName: "Jentara",
        fullName: "Kevin Jentara",
        address: "Jln. Kemayoran, Jember",
        phone: "089786756354",
        email: "kevin@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        firstName: "Tegar",
        lastName: "Sanjaya",
        fullName: "Tegar Maulana Sanjaya",
        address: "Jln. Tegal, Jember",
        phone: "08677564542312",
        email: "tegar@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        firstName: "Rendy",
        lastName: "Panduwinata",
        fullName: "Rendy Panduwinata",
        address: "Jln. Riau, Situbondo",
        phone: "087612345678",
        email: "rendy@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("TourGuides", null, {})
  }
};
