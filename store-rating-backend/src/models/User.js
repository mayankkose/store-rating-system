const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    name: {
      type: DataTypes.STRING(60),
      allowNull: false
    },

    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    address: {
      type: DataTypes.STRING(400)
    },

    role: {
      type: DataTypes.ENUM(
        'ADMIN',
        'USER',
        'STORE_OWNER'
      ),
      defaultValue: 'USER'
    }
  },
  {
    tableName: 'users',

    timestamps: true,

    createdAt: 'created_at',

    updatedAt: 'updated_at'
  }
);
module.exports = User;