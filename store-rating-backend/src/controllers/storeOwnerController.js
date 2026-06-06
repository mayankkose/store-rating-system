const { Store, Rating, User } = require('../models');

// Dashboard
exports.getDashboard = async (req, res) => {
  try {
      console.log("JWT USER:", req.user);
    const store = await Store.findOne({
      where: {
        owner_id: req.user.id
      }
    });

    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }

    const ratings = await Rating.findAll({
      where: {
        store_id: store.id
      }
    });

    const totalRatings = ratings.length;

    let averageRating = 0;

    if (totalRatings > 0) {
      averageRating =
        ratings.reduce(
          (sum, item) => sum + item.rating,
          0
        ) / totalRatings;
    }

    return res.status(200).json({
      success: true,
      data: {
        storeName: store.name,
        averageRating:
          Number(averageRating.toFixed(1)),
        totalRatings
      }
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
exports.getRatings = async (req, res) => {
  try {

    const store = await Store.findOne({
      where: {
        owner_id: req.user.id
      }
    });

    const ratings =
      await Rating.findAll({
        where: {
          store_id: store.id
        },
        include: [
          {
            model: User,
            attributes: [
              'id',
              'name',
              'email'
            ]
          }
        ]
      });

    return res.status(200).json({
      success: true,
      data: ratings
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};