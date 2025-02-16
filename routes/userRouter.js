const express = require('express');
const router = express.Router();
const { User, syncDatabase } = require('../models/userModel.js');
const encryptPassword = require('../lib/passwordUtils.js');
const bcrypt = require('bcrypt');
const { isAuth, isAdmin } = require('../config/authMiddleware.js');


router.get('/', (req, res) => {
    res.send(`<h1>Home</h1><p>Please <a href="/register">register</a> or <a href="/login">login</a></p>`);
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

router.get('/login', (req, res, next) => {

    const form = '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="password" name="password">\
    <br><br><input type="submit" value="Login"></form>';

    res.send(form);

});


router.post('/register', async (req, res) => {
    try {
        await syncDatabase();

        const { firstName, lastName, email, password, location, dept } = req.body;

        if (!firstName || !lastName || !email || !password || !location || !dept) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }
        
        const hashedPassword = await encryptPassword(password);

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword, 
            location,
            dept
        });
        res.redirect('/login');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.post('/login', async (req, res) => {
    try {
        if (req.session.userId) {
            req.session.destroy((err) => {
                if (err) return res.status(500).json({ message: "Error logging out previous session" });
            });
        }

        const { username:email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.redirect(`/login-failure?message=${encodeURIComponent('User not found')}`);
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }

        req.session.user = user;
        return res.redirect('/login-success');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

});

router.get('/login-success', isAuth, (req, res, next) => {
    res.send(`<h1>Welcome ${req.session.user.firstName}</h1><p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>`);
});

router.get('/login-failure', (req, res, next) => {
    const message = req.query.message || 'Something went wrong.Please try again';
    res.send(`<p>${message}</p>
              <p><a href="/login">Go to login</a></p>`);
});


router.get('/protected-route', isAuth, (req, res, next) => {
    res.send(`<h1>Welcome ${req.session.user.firstName}</h1><p>You made it to the protected-route.</p><p><a href="/logout">Logout</a></p><p><a href="/admin-route">Go to admin route</a></p>`);
});

router.get('/admin-route', isAdmin, (req, res, next) => {
    res.send(`<h1>Welcome ${req.session.user.firstName}</h1><p>You made it to the admin route.</p> <a href="/logout">Logout</a>`);
});

router.get('/logout', isAuth, (req, res, next) => {
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