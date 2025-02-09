require('dotenv').config(); // Import the dotenv module and configure it
const express = require('express'); // Import the express module
const app = express(); // Create an instance of express
const port = 3000; // Define the port number
const router = require('./routes/index.js'); // Import the router from routes/index.js
const sessionMiddleware = require('./config/createSession.js'); // Import the session middleware from config/createSession.js
const { connect } = require('./config/dbConnect.js'); // Import the sequelize object from config/dbConnect.js
const passport = require('./config/passport');

app.set('trust proxy', 1); // Trust first proxy

app.use(express.json()); // Enable JSON parsing for request bodies
app.use(express.urlencoded({ extended: true })); // Enable URL-encoded parsing for request bodies

app.use(sessionMiddleware); // Use the session middleware
app.use(passport.initialize()); // Initialize passport
app.use(passport.session()); // Use passport session

app.use('/images', express.static('public/images')); // Serve static files from the 'public/images' directory

app.use(router); // Use the router

connect(); // Connect to the database

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`); // Start the server and listen on the specified port
})