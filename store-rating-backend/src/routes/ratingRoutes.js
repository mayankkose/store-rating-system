const express = require('express');
const router = express.Router();

const authMiddleware =
require('../middlewares/authMiddleware');

const {
  submitRating,
  updateRating
} = require('../controllers/ratingController');

router.post(
  '/',
  authMiddleware,
  submitRating
);

router.put(
  '/:storeId',
  authMiddleware,
  updateRating
);

module.exports = router;