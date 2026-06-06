const express = require('express');
const router = express.Router();

const authMiddleware =
  require('../middlewares/authMiddleware');

const roleMiddleware =
  require('../middlewares/roleMiddleware');

const {
  createStore,
  getStores
} = require('../controllers/storeController');

// CREATE STORE
router.post(
  '/',
  authMiddleware,
  roleMiddleware('ADMIN'),
  createStore
);

// GET STORES
router.get(
  '/',
  authMiddleware,
  getStores
);

module.exports = router;

