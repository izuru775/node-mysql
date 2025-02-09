# Node MySQL Project

This project is a simple Node.js application that uses Express for the web server and Sequelize for interacting with a MySQL database. The application demonstrates basic CRUD operations with a user model and includes user authentication using Passport.js and session store.

## Prerequisites

- Node.js (v18 or higher)
- MySQL server

## Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd node-mysql
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Set up your MySQL database and update the connection details in a [.env](http://_vscodecontentref_/1) file:
    ```sh
    touch .env
    ```

    Add the following content to the [.env](http://_vscodecontentref_/2) file:
    ```env
    DB_DATABASE=mydb
    DB_USERNAME=root
    DB_PASSWORD=toor
    DB_HOST=localhost
    DB_DIALECT=mysql
    SESSION_SECRET=your_secret_key
    ```

4. Update the connection details in [dbConnect.js] to use environment variables:
    ```js
    const sequelize = new Sequelize({
        database: process.env.DB_DATABASE,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
    });
    ```

## Running the Project

1. Start the MySQL server.

2. Run the application:
    ```sh
    npm start
    ```

3. The application will start and listen on port 3000. You can access it at `http://localhost:3000`.

## Notes

- The first time you run the application, it will synchronize the database tables. You can comment out the [await syncDatabase();] line in [app.js] after the first run to avoid re-syncing the tables.

## Explanation of Passport.js with Session Store

Passport.js is used for user authentication in this project. It uses sessions to keep track of authenticated users. When a user logs in, Passport.js creates a session and stores the user's information in the session store. The session store is backed by a MySQL database using `connect-session-sequelize`.

The session store keeps track of authenticated users and their session expiry. The session expiry is set to 24 hours (`86,400,000` milliseconds) in this example. If a user is inactive for more than 24 hours, their session will expire, and they will need to log in again.

The session store ensures that user sessions are persistent and can be shared across multiple instances of the application, providing a scalable solution for user authentication.