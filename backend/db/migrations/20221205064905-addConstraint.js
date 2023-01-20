"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    // Transactions
    await queryInterface.addConstraint("Transactions", {
      fields: ["userId"],
      type: "foreign key",
      name: "user_transaction_association",
      references: {
        table: "Users",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    // DetailTransactions
    await queryInterface.addConstraint("DetailTransactions", {
      fields: ["transactionId"],
      type: "foreign key",
      name: "transaction_detailTransaction_association",
      references: {
        table: "Transactions",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    await queryInterface.addConstraint("DetailTransactions", {
      fields: ["tourId"],
      type: "foreign key",
      name: "tour_detailTransaction_association",
      references: {
        table: "Tours",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });

    // Tours
    await queryInterface.addConstraint("Tours", {
      fields: ["hotelId"],
      type: "foreign key",
      name: "tour_hotel_association",
      references: {
        table: "Hotels",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });

    await queryInterface.addConstraint("Tours", {
      fields: ["transportationId"],
      type: "foreign key",
      name: "tour_transportation_association",
      references: {
        table: "Transportations",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });

    await queryInterface.addConstraint("Tours", {
      fields: ["tourGuideId"],
      type: "foreign key",
      name: "tour_tourGuide_association",
      references: {
        table: "TourGuides",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    // Transactions
    await queryInterface.removeConstraint(
      "Transactions",
      "user_transaction_association"
    );

    // DetailTransactions
    await queryInterface.removeConstraint(
      "DetailTransactions",
      "transaction_detailTransaction_association"
    );
    await queryInterface.removeConstraint(
      "DetailTransactions",
      "tour_detailTransaction_association"
    );

    // Tours
    await queryInterface.removeConstraint("Tours", "tour_hotel_association");
    await queryInterface.removeConstraint(
      "Tours",
      "tour_transportation_association"
    );
    await queryInterface.removeConstraint(
      "Tours",
      "tour_tourGuide_association"
    );
  },
};
