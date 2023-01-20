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
     await queryInterface.bulkInsert("Transportations", [
      {
        id: uuidv4(),
        name: "Bus Patas SaintSaiya",
        capacity: 100,
        price: 450000,
        description: "<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et nulla consectetur hic quae consequuntur adipisci nisi officiis, blanditiis velit officia minima vero sapiente modi id quis veniam. Obcaecati, et atque.</p><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, voluptatum ullam sit recusandae sint id ut quod, totam amet accusantium animi, quasi explicabo magnam enim. Debitis minus optio nihil expedita!</p>",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "Bus Pariwisata Maulani",
        capacity: 50,
        price: 500000,
        description: "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium quod vero neque tempora sequi nemo id quos amet minus beatae!</p><p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate et fuga quam.</p><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum minus quisquam enim sapiente temporibus alias in deserunt aliquid adipisci earum veritatis tenetur amet, vitae quis voluptatum eveniet impedit reprehenderit ut labore beatae placeat! Impedit delectus sint, quibusdam fugit numquam nulla. Nulla iure eum dolor necessitatibus aliquid nobis blanditiis praesentium totam.</p>",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "Bus Ekonomi Jaya Makmur",
        capacity: 50,
        price: 800000,
        description: "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit similique quam tempore accusamus numquam!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab eos, perspiciatis illum aut nostrum magni enim? Distinctio, nulla. Cupiditate dolores hic consectetur fugiat perferendis doloremque dicta recusandae! Quasi recusandae aut minima quibusdam voluptatem molestias cupiditate illo, perferendis facere asperiores soluta.</p>",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete("Transportations", null, {});
  }
};
