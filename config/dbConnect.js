const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: 'mysql',
});

/**
 * Establishes a connection to the database using Sequelize.
 * Logs a success message if the connection is established successfully.
 * Logs an error message if the connection fails.
 * 
 * @async
 * @function connect
 * @returns {Promise<void>} A promise that resolves when the connection attempt is complete.
 */
const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports ={
    connect ,sequelize
}