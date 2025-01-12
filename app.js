const express = require('express'); // Import the express module
const app = express(); // Create an instance of express
const port = 3000; // Define the port number
const { connect } = require('./dbConnect.js'); // Import the connect function from dbConnect.js
const { User, syncDatabase } = require('./models/userModel.js'); // Import the User model and syncDatabase function from userModel.js

connect(); // Establish a connection to the database

// Function to run the database operations
async function run() {
    await syncDatabase(); // Sync the database tables (comment this out after the first run)

    // Create a new user
    const newUser = await User.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'securepassword123', // Make sure to use a hashed password in production.
        location: 'New York',
        dept: 'Engineering',
    });

    console.log('New user created:', newUser.toJSON()); // Log the new user details
}

run().catch((error) => {
    console.error('Error:', error.message); // Catch and log any errors
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`); // Start the server and listen on the specified port
});
