const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const dbConfig = require('./dbConnect.js'); // Adjust the path as necessary
const { User, syncDatabase } = require('../models/userModel.js'); // Import the User model and syncDatabase function from userModel.js


passport.use(new LocalStrategy(async (username, password, done) => {

        User.findOne({ where: {email:username}})
        .then(user => {
            if(!user){
                return done(null, false, {message: 'Incorrect username.'});
            }
            bcrypt.compare(password, user.password, (err, res) => {
                if(res){
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Incorrect password.'});
                }
            });
        })
        .catch(err => done(err));
}));


// Serialize and deserialize user to maintain session
passport.serializeUser((user, done) => {
    done(null, user.id); // Store the user ID in the session
});

passport.deserializeUser(async (id, done) => {
    try {
        //const user = await User.findOne(id); // Retrieve user by ID
        const user = await User.findByPk(id); // Retrieve user by ID
        done(null, user);
    } catch (error) {
        done(error);
    }
});

module.exports = passport;