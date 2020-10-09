
const express = require('express');
const session = require('express-session');
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

app.get('/', (req, res) => res.send("Nothing to see here..."));

module.exports = app;
