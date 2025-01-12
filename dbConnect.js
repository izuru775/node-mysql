const { Sequelize } = require('sequelize');
const { MySqlDialect } = require('@sequelize/mysql');

const sequelize = new Sequelize({
    database: 'mydb',
    username: 'root',
    password: 'toor',
    host: 'localhost',
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
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports ={
    connect ,sequelize
}