const isAuth = (req, res, next) => {
    if (req.session.user) {
        next();  // If the user is authenticated, call the next middleware
    }else{
        res.status(401).json({ message: "Unauthorized" });
    }
}

isAdmin = (req, res, next) => {
    console.log('req.session.user:', req.session.user);
    if (req.session.user && req.session.user.isAdmin) {
        return next();  // If the user is an admin, call the next middleware
    }
    res.status(403).json({ message: "Forbidden" });
}

module.exports = { isAuth, isAdmin };