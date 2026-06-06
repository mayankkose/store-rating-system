const { User, Store, Rating } = require('../models');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

// Dashboard
exports.getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalStores = await Store.count();
    const totalRatings = await Rating.count();

    return res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalStores,
        totalRatings
      }
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Create User
exports.createUser = async (req, res) => {
  try {

    const {
      name,
      email,
      password,
      address,
      role
    } = req.body;

    const existingUser = await User.findOne({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists'
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      role
    });

    return res.status(201).json({
      success: true,
      user
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// Get Users
exports.getUsers = async (req, res) => {
  try {

    const {
      page = 1,
      limit = 10,
      search = '',
      role,
      sortBy = 'name',
      order = 'ASC'
    } = req.query;

    const offset =
      (page - 1) * limit;

    const where = {};

    if (search) {
      where[Op.or] = [
        {
          name: {
            [Op.like]: `%${search}%`
          }
        },
        {
          email: {
            [Op.like]: `%${search}%`
          }
        },
        {
          address: {
            [Op.like]: `%${search}%`
          }
        }
      ];
    }

    if (role) {
      where.role = role;
    }

    const users =
      await User.findAndCountAll({
        where,
        attributes: {
          exclude: ['password']
        },
        limit: Number(limit),
        offset: Number(offset),
        order: [[sortBy, order]]
      });

    return res.status(200).json({
      success: true,
      total: users.count,
      data: users.rows
    });

  } catch (error) {

  console.error("GET USERS ERROR:");
  console.error(error);

  return res.status(500).json({
    success: false,
    message: error.message
  });

}
};



exports.getUserById = async (req, res) => {
  try {

    const user = await User.findByPk(
      req.params.id,
      {
        attributes: {
          exclude: ['password']
        }
      }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    let averageRating = null;

    if (user.role === 'STORE_OWNER') {

      const store = await Store.findOne({
        where: {
          owner_id: user.id
        }
      });

      if (store) {

        const ratings =
          await Rating.findAll({
            where: {
              store_id: store.id
            }
          });

        if (ratings.length > 0) {

          averageRating =
            ratings.reduce(
              (sum, item) =>
                sum + item.rating,
              0
            ) / ratings.length;

          averageRating =
            Number(
              averageRating.toFixed(1)
            );
        }
      }
    }

    return res.status(200).json({
      success: true,
      data: {
        ...user.toJSON(),
        averageRating
      }
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};