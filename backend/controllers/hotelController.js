require("dotenv").config();

const Validator = require("fastest-validator");
const { Hotel, Tour, Sequelize } = require("../db/models");
const { google } = require("googleapis");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const v = new Validator();

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } = process.env;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

module.exports = {
  get: async (req, res, next) => {
    const where = {};

    const schema = {
      name: {
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

    const name = req.query.name;

    if (name) where.name = { [Sequelize.Op.like]: `%${name}%` };

    const hotels = await Hotel.findAndCountAll({
      where,
      order: [["name", "ASC"]],
    });

    if (!hotels.length) {
      return res.status(404).json({
        success: false,
        message: "Hotels not Found",
        data: hotels,
      });
    }

    res.status(200).json({
      success: true,
      message: "Hotels Found",
      data: hotels,
    });

    next();
  },
  find: async (req, res, next) => {
    const id = req.params.id;

    const hotel = await Hotel.findByPk(id, {
      include: Tour,
    });

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not Found",
        data: hotel,
      });
    }

    res.status(200).json({
      success: true,
      message: "Hotel Found",
      data: hotel,
    });

    next();
  },
  create: async function (req, res, next) {
    console.log(req.body);
    const schema = {
      name: {
        type: "string",
        empty: false,
      },
      address: {
        type: "string",
        empty: false,
        optional: true,
      },
      description: {
        type: "string",
        empty: false,
      },
      price: {
        type: "number",
        empty: false
      }
    };

    const validated = v.validate(req.body, schema);

    if (validated.length) {
      return res.status(400).json({
        success: false,
        message: validated[0].message,
        data: null,
      });
    }

    const { name, address, description, price } = req.body;
    // const photo = './public/images/' + req.file.originalname;

    // const folderId = "1eJMYUxw1vDizjvZc9qWd8CDdd7piZKXy";

    // const fileMetadata = {
    //   name: uuidv4() + ".jpg",
    //   parents: [folderId],
    // };
    
    // const media = {
    //   mimeType: "image/jpeg",
    //   body: fs.createReadStream(photo),
    // };

    // const file = await drive.files.create({
    //   resource: fileMetadata,
    //   media: media,
    //   fields: 'id',
    // })

    const hotel = await Hotel.create({
      name,
      address,
      description,
      price
    });

    res.status(201).json({
      success: true,
      message: "Hotel has been Submited successfully!",
      data: hotel,
    });

    next();
  },
  update: async (req, res, next) => {
    const id = req.params.id;

    let hotel = await Hotel.findByPk(id);

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found!",
        data: hotel,
      });
    }

    const schema = {
      name: {
        type: "string",
        empty: false,
        optional: true,
      },
      adrress: {
        type: "string",
        empty: false,
        optional: true,
      },
      description: {
        type: "string",
        empty: false,
        optional: true,
      },
      price: {
        type: "number",
        empty: false,
        optional: true
      }
    };

    const validated = v.validate(req.body, schema);

    if (validated.length) {
      return res.status(400).json({
        success: false,
        message: validated[0].message,
        data: hotel,
      });
    }

    hotel = await hotel.update(req.body);

    res.status(200).json({
      success: true,
      message: "Hotel updated successfully",
      data: hotel,
    });

    next();
  },
  delete: async (req, res, next) => {
    const id = req.params.id;

    const hotel = await Hotel.findByPk(id);

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not Found",
        data: hotel,
      });
    }

    // await drive.files.delete({
    //   fileId: hotel.photo
    // })

    await hotel.destroy();

    res.status(200).json({
      success: true,
      message: "Hotel deleted successfully",
      data: null,
    });

    next();
  },
};
