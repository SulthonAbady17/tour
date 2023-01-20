const { User } = require("../db/models");
const bcrypt = require("bcrypt");
const Validator = require("fastest-validator");

const v = new Validator();

module.exports = {
  login: async (req, res, next) => {
    const schema = {
      email: "email",
      password: {
        type: "string",
        singleLine: true,
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

    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid email!",
        data: null,
      });
    }

    const auth = await bcrypt.compare(password, user.password);

    if (!auth) {
      return res.status(400).json({
        success: false,
        message: "Invalid password!",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Login Success",
      data: user,
    });

    next();
  },

  signup: async (req, res, next) => {
    const schema = {
      firstName: {
        type: "string",
        alpha: true,
        empty: false
      },
      lastName: {
        type: "string",
        alpha: true,
        empty: false
      },
      fullName: {
        type: "string",
        empty: false
      },
      citizen: {
        type: "enum",
        values: ["WNI", "WNA"],
      },
      nik: {
        type: "string",
        length: 16,
        numeric: true,
        empty: false
      },
      address: {
        type: "string",
        empty: false
      },
      date: {
        type: "string",
        empty: false
      },
      phone: {
        type: "string",
        numeric: true,
        empty: false
      },
      email: {
        type: "email",
        unique: true,
        empty: false
      },
      password: {
        type: "string",
        min: 8,
        singleLine: true,
        empty: false
      },
      role: {
        type: "enum",
        values: ["user", "admin"],
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

    const { firstName, lastName, fullName, citizen, address, date, nik, phone, email, password, role } = req.body
    
    const salt = bcrypt.genSaltSync()
    const hashPassword = bcrypt.hashSync(password, salt)

    const user = await User.create({
      firstName: firstName,
      lastName: lastName,
      fullName: fullName,
      citizen: citizen,
      nik: nik,
      address: address,
      date: date,
      phone: phone,
      email: email,
      password: hashPassword,
      role: role,
    });

    res.status(201).json({
      success: true,
      message: "User has been Signed up successfully!",
      data: user,
    });

    next();
  },
  forgot: async (req, res) => {
    const schema = {
      email: {
        type: "email",
        empty: false
      }
    }
    
    const validated = v.validate(req.body, schema);
    
    if (validated.length) {
      return res.status(400).json({
        success: false,
        message: validated[0].message,
        data: null,
      });
    }
    
    const { email } = req.body

    const user = await User.findOne({ where: { email } })

    if(!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: user
      })
    }

    res.status(200).json({
      success: true,
      message: "User found",
      data: user
    })
  },
  reset: async (req, res) => {
    const schema = {
      id: {
        type: "uuid",
        empty: false
      },
      password: {
        type: "string",
        min: 8,
        singleLine: true,
        empty: false
      }
    }
    
    const validated = v.validate(req.body, schema);
    
    if (validated.length) {
      return res.status(400).json({
        success: false,
        message: validated[0].message,
        data: null,
      });
    }

    const { id, password } = req.body

    let user = await User.findByPk(id)

    if(!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: user
      })
    }

    const salt = bcrypt.genSaltSync()
    const newPassword = bcrypt.hashSync(password, salt)

    user = await user.update({password: newPassword})

    res.status(200).json({
      success: true,
      message: "Password has been reseted successfully!",
      data: user
    })
  }
};
