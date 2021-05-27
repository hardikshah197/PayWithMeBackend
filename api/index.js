const cors = require('cors');
const frontApiDocs = require('../swagger/swagger');
const health = require('../routes/health');
const express = require('express');
const app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cors());
app.use(express.json());

app.use('/developer',frontApiDocs);
app.use('/api',health);

module.exports = app;