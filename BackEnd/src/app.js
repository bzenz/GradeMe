const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

const passport = require('./passport/setup');
const initRoutes = require('./routes/init');

app.use(cors());
// Bodyparser middleware, extended false does not allow nested payloads
app.use(express.json());

// passport middleware
app.use(passport.initialize());

initRoutes(app);

app.use('/', express.static(path.join(__dirname) + '/../client'));
app.get('/', (req, res) => res.sendFile(path.join(__dirname) + '/../client/index.html'));

module.exports = app;
