const Validator = require("fastest-validator");
const {
  Tour,
  Hotel,
  Transportation,
  TourGuide,
  Sequelize,
} = require("../db/models");

const v = new Validator();

module.exports = {
  get: async (req, res, next) => {
    const where = {};

    const schema = {
      destination: {
        type: "string",
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

    const { destination } = req.query;

    if (destination)
      where.destination = { [Sequelize.Op.like]: `%${destination}%` };

    const tours = await Tour.findAndCountAll({
      where,
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
    });

    if (!tours.length) {
      return res.status(404).json({
        success: false,
        message: "Tours not Found",
        data: tours,
      });
    }

    res.status(200).json({
      success: true,
      message: "Tours Found",
      data: tours,
    });

    next();
  },
  find: async (req, res, next) => {
    const id = req.params.id;

    const tour = await Tour.findByPk(id, {
      include: [
        {
          model: Hotel
        },
        {
          model: Transportation
        },
        {
          model: TourGuide
        }
      ]
    });

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not Found",
        data: tour,
      });
    }

    res.status(200).json({
      success: true,
      message: "Tour Found",
      data: tour,
    });

    next();
  },
  create: async (req, res, next) => {
    const schema = {
      destination: {
        type: "string",
      },
      description: {
        type: "string",
      },
      hotelId: {
        type: "uuid",
      },
      transportationId: {
        type: "uuid",
      },
      tourGuideId: {
        type: "uuid",
      },
      price: {
        type: "number",
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

    const tour = await Tour.create(req.body);

    res.status(201).json({
      success: true,
      message: "Tour has been submitted successfully",
      data: tour,
    });

    next();
  },
  update: async (req, res, next) => {
    const id = req.params.id;

    let tour = await Tour.findByPk(id);

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not Found",
        data: tour,
      });
    }

    const schema = {
      destination: {
        type: "string",
        optional: true,
      },
      description: {
        type: "string",
        optional: true,
      },
      hotelId: {
        type: "uuid",
        optional: true,
      },
      transportationId: {
        type: "uuid",
        optional: true,
      },
      tourGuideId: {
        type: "uuid",
        optional: true,
      },
      price: {
        type: "number",
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

    tour = await tour.update(req.body);

    res.status(200).json({
      success: true,
      message: "Tour updated successfully",
      data: tour,
    });

    next();
  },
  delete: async (req, res, next) => {
    const id = req.params.id;

    const tour = await Tour.findByPk(id);

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not Found",
        data: tour,
      });
    }

    await tour.destroy();

    res.status(200).json({
      success: true,
      message: "Tour deleted successfully",
      data: null,
    });

    next();
  },
};
