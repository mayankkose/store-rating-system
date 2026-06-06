const { Rating, Store } = require('../models');

// Submit Rating
exports.submitRating = async (req, res) => {
  try {

    const { storeId, rating } = req.body;

    const existingRating =
      await Rating.findOne({
        where: {
          user_id: req.user.id,
          store_id: storeId
        }
      });

    if (existingRating) {
      return res.status(400).json({
        success: false,
        message: 'You already rated this store'
      });
    }

    const newRating =
      await Rating.create({
        user_id: req.user.id,
        store_id: storeId,
        rating
      });

    return res.status(201).json({
      success: true,
      data: newRating
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

// Update Rating
exports.updateRating = async (req, res) => {
  try {

    const { storeId } = req.params;
    const { rating } = req.body;

    const existingRating =
      await Rating.findOne({
        where: {
          user_id: req.user.id,
          store_id: storeId
        }
      });

    if (!existingRating) {
      return res.status(404).json({
        success: false,
        message: 'Rating not found'
      });
    }

    existingRating.rating = rating;

    await existingRating.save();

    return res.status(200).json({
      success: true,
      data: existingRating
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};