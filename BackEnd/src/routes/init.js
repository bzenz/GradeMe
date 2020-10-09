
module.exports = app => 
{
    // API
    app.use('/api/auth', require('./api/auth'));
    app.use('/api/user', require('./api/user'));
    app.use('/api/admin', require('./api/admin'));
    app.use('/api/task', require('./api/task'));
    app.use('/api/evaluation', require('./api/evaluation'));
    app.use('/api/course', require('./api/course'));
    app.use('/api/subject', require('./api/subject'));

};
