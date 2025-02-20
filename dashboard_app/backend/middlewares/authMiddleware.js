const jwt = require("jsonwebtoken");

const isLoggedIn = async (req, res, next) => {
    try {
        const authToken = req.cookies.authToken;
        if (!authToken) {
            return res.status(401).json({
                success: false,
                message: "User is not authenticated",
            });
        }

        const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (err) {
        console.error(`Error in isLoggedIn middleware: ${err.message}`);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

const isAdmin = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Please login",
            });
        }

        const userRole = req.user?.role;
        if (!userRole || !roles.includes(userRole)) {
            return res.status(403).json({
                success: false,
                message: "User is not authorized",
            });
        }

        next();
    };
};

module.exports = { isLoggedIn, isAdmin };
