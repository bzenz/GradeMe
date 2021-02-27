
const passport = require('passport');
const { setupSerialization } = require('./serialization');
const { setupStrategies } = require('./strategies');

setupSerialization(passport);
setupStrategies(passport);

module.exports = passport;
