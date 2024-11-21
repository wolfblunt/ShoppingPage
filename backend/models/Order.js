const { DataTypes } = require('sequelize');
const sequelize = require('./../config/database');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  customerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  orderAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'processing', 'completed', 'cancelled'),
    allowNull: false,
    defaultValue: 'pending',
  },
  items: {
    type: DataTypes.JSON,
    allowNull: false,
    validate: {
      isValidItems(value) {
        if (!Array.isArray(value)) {
          throw new Error('Items must be an array');
        }
        value.forEach((item) => {
          if (
            !item.name ||
            typeof item.name !== 'string' ||
            !item.quantity ||
            typeof item.quantity !== 'number' ||
            !item.price ||
            typeof item.price !== 'number'
          ) {
            throw new Error('Each item must have a valid name, quantity, and price');
          }
        });
      },
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'orders',
  timestamps: false,
});

module.exports = Order;