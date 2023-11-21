const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
  try {
    const { identifier, password } = req.body;
    const user = await Users.findOne({
      $or: [{ email: identifier }, { mobile: identifier }],
    });

    if (user && bcrypt.compareSync(password, user.password)) {
      const accessToken = jwt.sign(
        {
          id: user._id,
          role: user.role,
          email: user.email,
          phone: user.phone,
        },
        process.env.JWT_SECRET || 'defaultSecret',
        { expiresIn: '1h' },
      );

      res.status(200).json({
        status: 'Success',
        message: 'Login successfully',
        data: {
          accessToken,
        },
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: "User doesn't exist",
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { name, email, mobile, password } = req.body;

    const existingemail = await Users.findOne({ email });
    const existingmobile = await Users.findOne({ mobile });

    if (existingemail) {
      return res.status(400).json({
        status: 'Error',
        message: 'Email already in use',
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        status: 'Error',
        message: 'Password must be at least 6 characters long.',
      });
    }

    if (existingmobile) {
      return res.status(400).json({
        status: 'error',
        message: 'Phone Number Already use',
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const users = await Users.create({
      name,
      email,
      mobile,
      password: hashedPassword,
    });
    res.status(200).json({
      status: 'Success',
      data: {
        users,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  register,
};
