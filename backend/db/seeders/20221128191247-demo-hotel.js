"use strict";

const { v4: uuidv4 } = require("uuid");

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
    await queryInterface.bulkInsert("Hotels", [
      {
        id: uuidv4(),
        name: "Hotel California",
        address: "Jln. Albania, Bali",
        description: "<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit dolor id maiores reprehenderit culpa beatae tempora vitae nam, cupiditate necessitatibus eos a dignissimos repellendus optio, quis, exercitationem in provident facilis!</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum aliquam aut facilis deserunt accusamus iste iusto alias similique porro? Porro, dolor rem magni eos assumenda accusantium perferendis! Unde, perferendis fuga?</p>",
        price: 450000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "Hotel Sanjaya",
        address: "Bumi Raya Hill, Jakarta",
        description: "<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae, ipsam.</p><p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum quisquam reprehenderit reiciendis, tempore culpa expedita, repellendus commodi cum blanditiis laudantium accusamus dignissimos sit porro quibusdam illo molestias, illum iusto dolorem?</p><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem nobis odio dolore corrupti veniam.</p>",
        price: 200000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "Hotel POP",
        address: "Jln. Panglima Soedirman, Malang",
        description: "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, fugit rerum nobis unde aspernatur non.</p><p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet, reprehenderit natus repudiandae quas deserunt iusto quis consectetur assumenda mollitia! Minus, fugit doloribus odit voluptatum et quod possimus officia nemo, laborum ex impedit, temporibus corporis amet? Rem id culpa, dolorem ea maiores consectetur rerum excepturi voluptatibus quas, magni, adipisci molestias modi.</p>",
        price: 350000,
        createdAt: new Date(),
        updatedAt: new Date(),
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
    await queryInterface.bulkDelete("Hotels", null, {});
  },
};
