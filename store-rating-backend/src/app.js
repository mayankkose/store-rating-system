const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const adminRoutes =
require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
const storeRoutes = require('./routes/storeRoutes');
const ratingRoutes =
require('./routes/ratingRoutes');
const storeOwnerRoutes =
require('./routes/storeOwnerRoutes');
const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/ratings', ratingRoutes);
app.use(
  '/api/store-owner',
  storeOwnerRoutes
);
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Store Rating API Running'
  });
});

// Protected Route
app.get('/api/profile', authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user
  });
});

module.exports = app;