const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models');

// Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    const existingUser = await User.findOne({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      role: 'USER'
    });

    return res.status(201).json({
      success: true,
      message: 'User Registered Successfully'
    });

  }catch (error) {
  console.error("SIGNUP ERROR:");
  console.error(error);

  return res.status(500).json({
    success: false,
    message: error.message
  });
}
};

// Login
exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User Not Found'
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Credentials'
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d'
      }
    );

    return res.status(200).json({
      success: true,
      token,
      role: user.role
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Change Password
exports.changePassword = async (req, res) => {
  try {

    const {
      oldPassword,
      newPassword
    } = req.body;

    const user =
      await User.findByPk(req.user.id);

    const isMatch =
      await bcrypt.compare(
        oldPassword,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Old Password Incorrect'
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({
      success: true,
      message:
        'Password Updated Successfully'
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};