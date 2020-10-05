
module.exports = app => 
{
    // API
    app.use('/api/auth', require('./auth'));
};
