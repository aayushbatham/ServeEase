// models/user.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../db/db.connect.js';

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('customer', 'worker', 'admin'),
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING, // Only applicable for customers
    allowNull: true, // Optional
  },
  service_id: {
    type: DataTypes.INTEGER, // Only applicable for workers
    allowNull: true, // Optional
  },
  availability: {
    type: DataTypes.STRING, // Only applicable for workers
    allowNull: true, // Optional
  },
  rating: {
    type: DataTypes.FLOAT, // Only applicable for workers
    allowNull: true, // Optional
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'users',
  timestamps: false,
});

// Export the model
export default User;
