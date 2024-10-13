// associations.js
import User from './user.model.js';
import Service from './service.model.js';
import Booking from './booking.model.js';

// User associations
User.hasMany(Booking, { foreignKey: 'user_id', sourceKey: 'user_id' }); // A user can have many bookings
Booking.belongsTo(User, { foreignKey: 'user_id', targetKey: 'user_id' }); // A booking belongs to a user

// Service associations
Service.hasMany(Booking, { foreignKey: 'service_id', sourceKey: 'service_id' }); // A service can have many bookings
Booking.belongsTo(Service, { foreignKey: 'service_id', targetKey: 'service_id' }); // A booking belongs to a service

// Export all models for easier access elsewhere
export { User, Service, Booking };
