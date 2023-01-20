const Validator = require("fastest-validator");
const { Transportation, Tour, Sequelize } = require("../db/models");
// const Transportation = require('../db/models/transportation')

const v = new Validator();

module.exports = {
  get: async (req, res, next) => {
    const where = {};

    const schema = {
      name: {
        type: "string",
        optional: true,
      },
      capacity: {
        type: 'string',
        optional: true
      }
    };

    const validated = v.validate(req.query, schema);

    if (validated.length) {
      return res.status(400).json({
        success: false,
        message: validated[0].message,
        data: null,
      });
    }

    const { name, capacity } = req.query;

    if (name) where.name = { [Sequelize.Op.like]: `%${name}%` };
    if (capacity) where.capacity = { [Sequelize.Op.like]: `%${capacity}%` };

    const transpotations = await Transportation.findAndCountAll({
      where,
      order: [["name", "ASC"]],
    });

    if (!transpotations.length) {
      return res.status(404).json({
        success: false,
        message: "Transportations not Found",
        data: transpotations,
      });
    }

    res.status(200).json({
      success: true,
      message: "Transportations Found",
      data: transpotations,
    });

    next();
  },
  find: async (req, res, next) => {
    const id = req.params.id;

    const transportation = await Transportation.findByPk(id, {
      include: Tour,
    });

    if (!transportation) {
      return res.status(404).json({
        success: false,
        message: "Transportation not Found",
        data: transportation,
      });
    }

    res.status(200).json({
      success: true,
      message: "Transportation Found",
      data: transportation,
    });

    next();
  },
  create: async (req, res, next) => {
    const schema = {
      name: {
        type: "string",
      },
      capacity: {
        type: "number",
      },
      price: {
        type: "number",
      },
      description: {
        type: "string",
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

    const transportation = await Transportation.create(req.body);

    res.status(201).json({
      success: true,
      message: "Transportation has been Submitted successfully",
      data: transportation,
    });

    next();
  },
  update: async (req, res, next) => {
    const id = req.params.id;

    let transportation = await Transportation.findByPk(id);

    if (!transportation) {
      return res.status(404).json({
        success: false,
        message: "Transportation not Found",
        data: transportation,
      });
    }

    const schema = {
      name: {
        type: "string",
        optional: true,
      },
      capacity: {
        type: "number",
        optional: true,
      },
      price: {
        type: "number",
        optional: true,
      },
      description: {
        type: "string",
        optional: true,
      },
    };

    const validated = v.validate(req.body, schema);

    if (validated.length) {
      return res.status(400).json({
        success: false,
        message: validated[0].message,
        data: transportation,
      });
    }

    transportation = await transportation.update(req.body);

    res.status(200).json({
      success: true,
      message: "Transportation updated successfully",
      data: transportation,
    });

    next();
  },
  delete: async (req, res, next) => {
    const id = req.params.id;

    const transportation = await Transportation.findByPk(id);

    if (!transportation) {
      return res.status(404).json({
        success: false,
        message: "Transportation not Found",
        data: transportation,
      });
    }

    await transportation.destroy();

    res.status(200).json({
      success: true,
      message: "Transportation deleted successfully",
      data: null,
    });

    next();
  },
};
