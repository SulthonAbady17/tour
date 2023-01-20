"use strict";

const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

function hash(pass) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(pass, salt);

  return hash;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Users", [
      {
        id: uuidv4(),
        firstName: "Sulthon",
        lastName: "Abadi",
        fullName: "Sulthon Muhtarom Putra Abadi",
        citizen: "WNI",
        nik: "3513141212020004",
        address: "Probolinggo",
        date: "2002-12-12",
        phone: "081231989438",
        email: "sulthon@gmail.com",
        password: hash("sulthon1234"),
        createdAt: new Date(),
        updatedAt: new Date(),
        role: "user",
      },
      {
        id: uuidv4(),
        firstName: "Adam",
        lastName: "Lazuardi",
        fullName: "Adam Davala Lazuardi",
        citizen: "WNA",
        nik: "3513141808010004",
        address: "Probolinggo",
        date: "2001-08-18",
        phone: "081231989123",
        email: "adam@gmail.com",
        password: hash("adam1234"),
        createdAt: new Date(),
        updatedAt: new Date(),
        role: "admin",
      },
      {
        id: uuidv4(),
        firstName: "Andrea",
        lastName: "Amalia",
        fullName: "Andrea Amalia",
        citizen: "WNI",
        nik: "3513232712920012",
        address: "Jember",
        date: "1992-12-27",
        phone: "081232435465",
        email: "andrea@gmail.com",
        password: hash("andrea1234"),
        createdAt: new Date(),
        updatedAt: new Date(),
        role: "admin",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
