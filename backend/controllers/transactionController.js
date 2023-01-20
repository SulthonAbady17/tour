const {
  Transaction,
  User,
  Hotel,
  Transportation,
  TourGuide,
  Tour,
  DetailTransaction,
  sequelize,
} = require("../db/models");

const Validator = require("fastest-validator");
const v = new Validator();

module.exports = {
  index: async (req, res, next) => {
    const transactions = await Transaction.findAll({
      order: [["updatedAt", "DESC"]],
      include: [
        {
          model: User,
        },
        {
          model: Tour,
        },
      ],
    });

    if (!transactions.length) {
      return res.status(404).json({
        success: false,
        message: "Transactions not Found",
        data: transactions,
      });
    }

    res.status(200).json({
      success: true,
      message: "Transactions Found",
      data: transactions,
    });

    next();
  },
  find: async (req, res, next) => {
    const id = req.params.id;

    const transaction = await Transaction.findByPk(id, {
      include: [
        {
          model: User,
        },
        {
          model: Tour,
          include: [
            {
              model: Hotel,
            },
            {
              model: Transportation,
            },
            {
              model: TourGuide,
            },
          ],
        },
      ],
      order: [["createdAt"]],
    });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not Found",
        data: transaction,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Transaction Found",
      data: transaction,
    });

    next();
  },
  update: async (req, res, next) => {
    const id = req.params.id;

    let transaction = await Transaction.findByPk(id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not Found",
        data: transaction,
      });
    }

    const schema = {
      date: {
        type: "string",
        optional: true,
      },
      tourId: {
        type: "uuid",
        optional: true,
      },
    };

    const validated = v.validate(req.body, schema);

    if (validated.length) {
      return res.status(400).json({
        success: false,
        message: validated[0].message,
        data: null,
      });
    }

    let detailTransaction = await DetailTransaction.findByPk(id);

    transaction = await transaction.update({
      date: req.body.date,
    });

    detailTransaction = await detailTransaction.update({
      tourId: req.body.tourId,
    });

    const newTransaction = await Transaction.findByPk(id, {
      include: DetailTransaction,
    });

    res.status(201).json({
      success: true,
      message: "Transaction updated successfully",
      data: newTransaction,
    });

    next();
  },
  delete: async (req, res, next) => {
    const id = req.params.id;

    const transaction = await Transaction.findByPk(id);

    const detailTransaction = await DetailTransaction.findByPk(id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not Found",
        data: transaction,
      });
    }

    await transaction.destroy();
    await detailTransaction.destroy();

    res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
      data: null,
    });

    next();
  },
};
