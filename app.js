const express = require('express'); // Import the express module
const app = express(); // Create an instance of express
const port = 3000; // Define the port number
const { connect } = require('./config/dbConnect.js'); // Import the connect function from dbConnect.js
const { User, syncDatabase } = require('./models/userModel.js'); // Import the User model and syncDatabase function from userModel.js
const sessionMiddleware = require('./config/createSession.js'); // Import the sessionMiddleware from createSession.js

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(sessionMiddleware); // Use the session middleware




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`); // Start the server and listen on the specified port
});
