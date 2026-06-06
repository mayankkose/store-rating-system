const express = require('express');
const router = express.Router();

const authMiddleware =
require('../middlewares/authMiddleware');

const roleMiddleware =
require('../middlewares/roleMiddleware');

const {
  getDashboard,
   createUser,
  getUsers,
   getUserById
} = require('../controllers/adminController');

router.get(
  '/dashboard',
  authMiddleware,
  roleMiddleware('ADMIN'),
  getDashboard
);
router.post(
  '/users',
  authMiddleware,
  roleMiddleware('ADMIN'),
  createUser
);

router.get(
  '/users',
  authMiddleware,
  roleMiddleware('ADMIN'),
  getUsers
);
router.get(
  '/users/:id',
  authMiddleware,
  roleMiddleware('ADMIN'),
  getUserById
);
module.exports = router;