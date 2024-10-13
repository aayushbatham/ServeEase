// models/booking.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../db/db.connect.js'; // Adjust the path as needed

const Booking = sequelize.define('Booking', {
  booking_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // Name of the table in the database
      key: 'user_id',
    },
  },
  service_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'services', // Name of the table in the database
      key: 'service_id',
    },
  },
  booking_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'completed', 'canceled'), // Different statuses for the booking
    allowNull: false,
    defaultValue: 'pending',
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'bookings',
  timestamps: false, // Disable automatic timestamps, since we're manually managing the `created_at` field
});

// Export the model
export default Booking;
