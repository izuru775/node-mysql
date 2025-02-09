const express = require('express');
const router = express.Router();
const passport = require('../config/passport.js');
const bcrypt = require('bcrypt');
const app = express();
const { User, syncDatabase } = require('../models/userModel.js'); // Import the User model and syncDatabase function from userModel.js
const { encryptPassword } = require('../lib/passwordUtils.js'); // Import the encryptPassword function from passwordUtils.js
const { isAdmin, isAuth } = require('../config/authMiddleware.js'); // Import the isAdmin and isAuth middleware functions from auth.js    
// post routes
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect(`/login-failure?message=${encodeURIComponent(info.message)}`);
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.redirect('/login-success');
        });
    })(req, res, next);
});


router.post('/register', async (req, res,next) => {
    try {
        await syncDatabase();

        const { firstName, lastName, email, password, location, dept } = req.body;

        // Validate input
        if (!firstName || !lastName || !email || !password || !location || !dept) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        // Hash password
        const { hashedPassword, salt } = await encryptPassword(password);

        
        // Create user record
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            salt,
            location,
            dept,
        });

        res.redirect('/login');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ success: false, message: 'Failed to register user', error: error.message });
    }
});


// Get routes
router.get('/', (req, res) => {
    res.send(`<h1>Home</h1><p>Please <a href="/register">register</a> or <a href="/login">login</a></p>`);
});

router.get('/login', (req, res, next) => {

    const form = '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Login"></form>';

    res.send(form);

});

router.get('/register', (req, res, next) => {

    const form = `<h1>Register Page</h1>
                  <form method="post" action="register">
                    Enter First Name:<br><input type="text" name="firstName"><br>
                    Enter Last Name:<br><input type="text" name="lastName"><br>
                    Enter Email:<br><input type="email" name="email"><br>
                    Enter Password:<br><input type="password" name="password"><br>
                    Enter Location:<br><input type="text" name="location"><br>
                    Enter Department:<br><input type="text" name="dept"><br><br>
                    <input type="submit" value="Submit">
                  </form>`;

    res.send(form);

});

router.get('/login-success', isAuth, (req, res, next) => {
    res.send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>');
});

router.get('/login-failure', (req, res, next) => {
    const message = req.query.message || 'Something went wrong.Please try again';
    res.send(`<p>${message}</p>
              <p><a href="/login">Go to login</a></p>`);
});

router.get('/protected-route', isAuth, (req, res, next) => {
    res.send('<p>You made it to the protected-route.</p><p><a href="/logout">Logout</a></p><p><a href="/admin-route">Go to admin route</a></p>');
});

router.get('/admin-route', isAdmin, (req, res, next) => {
    res.send('You made it to the admin route. <a href="/logout">Logout</a>');
});

// Visiting this route logs the user out
router.get('/logout', isAuth, (req, res,next) =>{
    console.log('Logging out');
    req.session.destroy(function (err) {
        if (err) {
            console.error('Error during logout:', err);
            return res.status(500).send('Error during logout');
        }
        res.clearCookie('connect.sid');
        res.redirect('/login');
    });
});


module.exports = router;