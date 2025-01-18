# Node MySQL Project

This project is a simple Node.js application that uses Express for the web server and Sequelize for interacting with a MySQL database. The application demonstrates basic CRUD operations with a user model.

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

3. Set up your MySQL database and update the connection details in a `.env` file:
    ```sh
    touch .env
    ```

    Add the following content to the `.env` file:
    ```env
    DB_DATABASE=mydb
    DB_USERNAME=root
    DB_PASSWORD=toor
    DB_HOST=localhost
    DB_DIALECT=mysql
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
- Make sure to use hashed passwords in production for better security.
