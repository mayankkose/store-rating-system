const express = require('express');
const router = express.Router();

const authMiddleware =
require('../middlewares/authMiddleware');

const roleMiddleware =
require('../middlewares/roleMiddleware');

const {
  getDashboard,
  getRatings
} = require('../controllers/storeOwnerController');

router.get(
  '/dashboard',
  authMiddleware,
  roleMiddleware('STORE_OWNER'),
  getDashboard
);

router.get(
  '/ratings',
  authMiddleware,
  roleMiddleware('STORE_OWNER'),
  getRatings
);

module.exports = router;