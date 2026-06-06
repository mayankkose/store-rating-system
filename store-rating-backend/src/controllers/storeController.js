
const { Store, Rating } = require('../models');
const { Sequelize } = require('sequelize');

const Op = Sequelize.Op;

// CREATE STORE
exports.createStore = async (req, res) => {
  try {

    const {
      name,
      email,
      address,
      owner_id
    } = req.body;

    const store = await Store.create({
      name,
      email,
      address,
      owner_id
    });

    return res.status(201).json({
      success: true,
      store
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// GET ALL STORES + SEARCH + SORT
exports.getStores = async (req, res) => {
  try {

    const {
      search = '',
      sortBy = 'name',
      order = 'ASC'
    } = req.query;

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

    const stores = await Store.findAll({
      where,
      order: [[sortBy, order]]
    });

    const result = await Promise.all(
      stores.map(async (store) => {

        const ratings = await Rating.findAll({
          where: {
            store_id: store.id
          }
        });

        let averageRating = 0;

        if (ratings.length > 0) {

          averageRating =
            ratings.reduce(
              (sum, item) =>
                sum + item.rating,
              0
            ) / ratings.length;

        }

        let myRating = null;

        if (req.user) {

          const userRating =
            await Rating.findOne({
              where: {
                store_id: store.id,
                user_id: req.user.id
              }
            });

          myRating =
            userRating
              ? userRating.rating
              : null;

        }

        return {
          id: store.id,
          name: store.name,
          email: store.email,
          address: store.address,
          averageRating: Number(
            averageRating.toFixed(1)
          ),
          myRating
        };

      })
    );

    return res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

