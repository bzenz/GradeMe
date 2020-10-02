
const express = require('express');
const session = require('express-session');
const app = express();

const passport = require('./passport/setup');
const initRoutes = require('./routes/init');

// Bodyparser middleware, extended false does not allow nested payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// express session
app.use(
    session({
        secret: 'whatever, it is just a secret',
        resave: false,
        saveUninitialized: true,
    })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

initRoutes(app);

app.get('/', (req, res) => res.send("Nothing to see here..."));

module.exports = app;
