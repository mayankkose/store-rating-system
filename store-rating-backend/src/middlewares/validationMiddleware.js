const { body, validationResult } = require('express-validator');

exports.signupValidation = [
  body('name')
    .isLength({ min: 20, max: 60 }),

  body('email')
    .isEmail(),

  body('address')
    .isLength({ max: 400 }),

  body('password')
    .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/)
    .isLength({ min: 8, max: 16 })
];

exports.validate = (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  next();
};