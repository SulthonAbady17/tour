const Validator = require("fastest-validator");
const { User, Tour, Sequelize, Transaction } = require("../db/models");

const v = new Validator();

module.exports = {
  get: async (req, res, next) => {
    const where = {};

    const schema = {
      firstName: {
        type: "string",
        alpha: true,
        optional: true,
      },
      lastName: {
        type: "string",
        alpha: true,
        optional: true,
      },
      fullName: {
        type: "string",
        optional: true,
      },
      citizen: {
        type: "enum",
        values: ["WNI", "WNA"],
        optional: true,
      },
      nik: {
        type: "string",
        length: 16,
        numeric: true,
        optional: true,
      },
      address: {
        type: "string",
        optional: true,
      },
      phone: {
        type: "string",
        numeric: true,
        optional: true,
      },
    };

    const validated = v.validate(req.query, schema);

    if (validated.length) {
      return res.status(400).json({
        success: false,
        message: validated[0].message,
        data: null,
      });
    }

    const { firstName, lastName, fullName, citizen, nik, address, phone } =
      req.query;

    if (firstName) where.firstName = { [Sequelize.Op.like]: `%${firstName}%` };
    if (lastName) where.lastName = { [Sequelize.Op.like]: `%${lastName}%` };
    if (fullName) where.fullName = { [Sequelize.Op.like]: `%${fullName}%` };
    if (citizen) where.citizen = { [Sequelize.Op.like]: `%${citizen}%` };
    if (nik) where.nik = { [Sequelize.Op.like]: `%${nik}%` };
    if (address) where.address = { [Sequelize.Op.like]: `%${address}%` };
    if (phone) where.phone = { [Sequelize.Op.like]: `%${phone}%` };

    const users = await User.findAndCountAll({
      where,
      order: [["firstName", "ASC"]],
    });

    if (!users) {
      return res.status(404).json({
        success: false,
        message: "Users not Found",
        data: users,
      });
    }

    res.status(200).json({
      success: true,
      message: "Users Found",
      data: users,
    });

    next();
  },
  find: async (req, res, next) => {
    const id = req.params.id;

    const user = await User.findByPk(id, {
      include: [
        {
          model: Transaction,
          include: Tour,
        },
      ],
    });

    if (!user) {
      return res.status(404).json({
        success: true,
        message: "User not Found",
        data: user,
      });
    }

    res.status(200).json({
      success: false,
      message: "User Found",
      data: user,
    });

    next();
  },
  getTransactions: async (req, res, next) => {
    const id = req.params.id;

    const transactions = await Transaction.findAll({
      where: {
        userId: id,
      },
    });

    if (!transactions) {
      return res.status(404).json({
        success: false,
        message: "Transactions not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Transactions Found",
      data: transactions,
    });

    next();
  },
  createTransaction: async (req, res, next) => {
    const id = req.params.id;

    const schema = {
      date: {
        type: "string",
      },
      tourId: {
        type: "uuid",
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

    const transaction = await Transaction.create({
      date: req.body.date,
      userId: id,
    });

    const tour = await Tour.findByPk(req.body.tourId);

    const result = await transaction.addTour(tour, {
      through: "DetailTransactions",
    });

    const current = await Transaction.findByPk(transaction.id);

    res.status(201).json({
      success: true,
      message: "Transaction success",
      data: current,
    });

    next();
  },
  update: async (req, res, next) => {
    const id = req.params.id;

    let user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
        data: user,
      });
    }

    const schema = {
      firstName: {
        type: "string",
        alpha: true,
        optional: true,
      },
      lastName: {
        type: "string",
        alpha: true,
        optional: true,
      },
      fullName: {
        type: "string",
        optional: true,
      },
      citizen: {
        type: "enum",
        values: ["WNI", "WNA"],
        optional: true,
      },
      nik: {
        type: "string",
        length: 16,
        numeric: true,
        optional: true,
      },
      address: {
        type: "string",
        optional: true,
      },
      date: {
        type: "string",
        optional: true,
      },
      phone: {
        type: "string",
        numeric: true,
        optional: true,
      },
      email: {
        type: "email",
        optional: true,
      },
      password: {
        type: "string",
        min: 8,
        singleLine: true,
        optional: true,
      },
      role: {
        type: "enum",
        values: ["user", "admin"],
        optional: true,
      },
    };

    const validated = v.validate(req.body, schema);

    if (validated.length) {
      return res.status(400).json({
        success: false,
        message: validated[0].message,
        data: user,
      });
    }

    user = await user.update(req.body);

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });

    next();
  },
  delete: async (req, res, next) => {
    const id = req.params.id;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
        data: user,
      });
    }

    await user.destroy();

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: null,
    });

    next();
  },
};
