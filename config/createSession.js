const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const options = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

const sessionStore = new MySQLStore(options);

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        secure: process.env.NODE_ENV === 'production',// Secure only in production
        maxAge: 24 * 60 * 60 * 1000  // session expires after 24 hours
        //maxAge: 60 * 1000 // session expires after 1 minute
    }
});

module.exports = sessionMiddleware;