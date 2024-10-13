// db/db.connect.js
import { Sequelize } from 'sequelize';

// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

// Create a Sequelize instance
const sequelize = new Sequelize(
    process.env.DB_NAME, // Database name
    process.env.DB_USER, // Database user
    process.env.DB_PASSWORD, // Database password
    {
        host: process.env.DB_HOST, // Database host
        dialect: 'mysql', // Database dialect
        logging: false, // Disable logging; you can enable it for debugging
    }
);

// Test the connection
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to MySQL has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
testConnection();

// Export the sequelize instance
export default sequelize;
