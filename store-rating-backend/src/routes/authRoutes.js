const express = require('express');
const router = express.Router();

const {
  signup,
  login,
  changePassword
} = require('../controllers/authController');

const authMiddleware = require('../middlewares/authMiddleware');

const {
  signupValidation,
  validate
} = require('../middlewares/validationMiddleware');

router.post(
  '/signup',
  signupValidation,
  validate,
  signup
);

router.post('/login', login);

router.put(
  '/change-password',
  authMiddleware,
  changePassword
);

module.exports = router;