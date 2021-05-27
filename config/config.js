require('dotenv').config();
module.exports = {
    development: {
        logDirectory: process.env.LOG_DIRECTORY || "/var/log/app",
        port:process.env.PORT || 4000,
        base_url: process.env.BASE_URL,
        mongoURI: process.env.MONGO_URI,
    },
    test: {
        logDirectory: process.env.LOG_DIRECTORY || "/var/log/app",
        port:process.env.PORT || 4000,
        base_url: process.env.BASE_URL,
        mongoURI: process.env.MONGO_URI,
    },
    production : {
        logDirectory: process.env.LOG_DIRECTORY || "/var/log/app",
        port:process.env.PORT || 4000,
        base_url: process.env.BASE_URL,
        mongoURI: process.env.MONGO_URI,
    }
}