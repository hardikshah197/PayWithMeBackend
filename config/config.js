require('dotenv').config();
module.exports = {
    development: {
        logDirectory: process.env.LOG_DIRECTORY || "./var/log/app",
        port:process.env.PORT || 4000,
        base_url: process.env.BASE_URL || 'localhost:4000',
        mongoURI: process.env.URI,
    },
    test: {
        logDirectory: process.env.LOG_DIRECTORY || "./var/log/app",
        port:process.env.PORT || 4000,
        base_url: process.env.BASE_URL || 'localhost:4000',
        mongoURI: process.env.URI,
    },
    production : {
        logDirectory: process.env.LOG_DIRECTORY || "./var/log/app",
        port:process.env.PORT || 4000,
        base_url: process.env.BASE_URL || 'localhost:4000',
        mongoURI: process.env.URI,
    }
}