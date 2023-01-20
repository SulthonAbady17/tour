"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Transactions", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      date: {
        type: Sequelize.DATEONLY,
      },
      userId: {
        type: Sequelize.UUID,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // await queryInterface.addConstraint("Transactions", {
    //   fields: ["userId"],
    //   type: "foreign key",
    //   name: "user_transaction_association",
    //   references: {
    //     table: "Users",
    //     field: "id",
    //   },
    //   onUpdate: "CASCADE",
    //   onDelete: "SET NULL",
    // });
  },
  async down(queryInterface, Sequelize) {
    // await queryInterface.removeConstraint(
    //   "Transactions",
    //   "user_transaction_association"
    // );

    await queryInterface.dropTable("Transactions");
  },
};
