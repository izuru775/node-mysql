const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/dbConnect.js')

/**
 * User model definition.
 * 
 * @typedef {Object} User
 * @property {string} firstName - The first name of the user. Cannot be null.
 * @property {string} lastName - The last name of the user. Defaults to null.
 * @property {string} email - The email of the user. Must be unique and cannot be null.
 * @property {string} password - The password of the user. Cannot be null.
 * @property {string} [location] - The location of the user. Optional.
 * @property {string} [dept] - The department of the user. Optional.
 * @property {boolean} [isAdmin=false] - Indicates if the user is an admin. Defaults to false.
 * @property {Date} [registerDate=Date.now] - The registration date of the user. Defaults to the current date and time.
 */
const User = sequelize.define('User', {
    // Model attributes are defined here
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        // allowNull defaults to true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
    },
    dept: {
        type: DataTypes.STRING,
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    registerDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    // Other model options go here
});

// Synchronize the model with the database
// This function will delete all existing tables in the database
async function syncDatabase() {
    await sequelize.sync();
    console.log('Database synchronized.');
}


module.exports = { User, syncDatabase };