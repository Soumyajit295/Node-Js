const fs = require("fs")

const requestLogger = (req, res, next) => {
    const log = `${new Date().toISOString()} - ${req.method} request || ${req.path} path\n`
    
    fs.appendFile("./reqlog.txt", log, (err) => {
        if (err) {
            console.log("Failed to log request")
        }
    });

    next()
};

module.exports = requestLogger
