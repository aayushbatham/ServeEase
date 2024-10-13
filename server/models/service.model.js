// models/service.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../db/db.connect.js'; // Adjust the path as needed

const Service = sequelize.define('Service', {
  service_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2), // Decimal with 10 digits total, 2 after the decimal point
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'services',
  timestamps: false, // Disable automatic timestamps, since we're manually managing the `created_at` field
});

// Export the model
export default Service;
