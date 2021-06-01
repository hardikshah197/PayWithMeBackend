require('dotenv').config();
module.exports = {
    development: {
        logDirectory: process.env.LOG_DIRECTORY || "./var/log/app",
        port:process.env.PORT || 4000,
        base_url: process.env.BASE_URL || 'http://localhost:4000',
        mongoURI: process.env.URI || 'http://localhost:27017',
    },
    test: {
        logDirectory: process.env.LOG_DIRECTORY || "./var/log/app",
        port:process.env.PORT || 4000,
        base_url: process.env.BASE_URL || 'http://localhost:4000',
        mongoURI: process.env.URI|| 'http://localhost:27017',
    },
    production : {
        logDirectory: process.env.LOG_DIRECTORY || "./var/log/app",
        port:process.env.PORT || 4000,
        base_url: process.env.BASE_URL || 'http://localhost:4000',
        mongoURI: process.env.URI|| 'http://localhost:27017',
    }
}