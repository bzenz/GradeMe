const { getUserById } = require('../db/user/getUser');

const setupSerialization = passport => 
{
    passport.serializeUser((user, done) =>
    {
        done(null, user.Id);
    });

    passport.deserializeUser(async (id, done) =>
    {
        const user = await getUserById(id);
        done(null, user);
    });
};

exports.setupSerialization = setupSerialization;
