const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt');
const { getUserById, getUserByLoginName } = require('../db/getUser');

const bcrypt = require('bcryptjs'),
    passport = require('passport'),
    { Strategy: LocalStrategy } = require('passport-local');

const register = (id, password, done) => 
{
    bcrypt.genSalt(10, (err, salt) => 
    {
        bcrypt.hash(password, salt, (err, hash) => 
        {
            if (err) throw err;
            
            // TODO: save the user in the DB
            const newUser = {};

            return done(null, newUser);
        });
    });
};

passport.serializeUser((user, done) => 
{
    done(null, user.Id);
});

passport.deserializeUser(async (id, done) =>
{
    const user = await getUserById(id);
    done(null, user);
});

passport.use(new LocalStrategy({usernameField: 'userId'}, async (loginName, password, done) =>
{
    const user = await getUserByLoginName(loginName);
    if (user) 
    {
        // passwort match?
        bcrypt.compare(password, user.PwHash, (err, isMatch) =>
        {
            if (err) throw err;
            
            if (isMatch) return done(null, user);
            return done(null, false, { message: 'Name oder Passwort falsch!' });
        });
    }
    else return done(null, false, { message: 'Name oder Passwort falsch!' });
}));

passport.use(new JWTStrategy(
    {
        secretOrKey: 'TOP_SECRET',
        jwtFromRequest: ExtractJwt.fromBodyField('request_token'),
    },
    (token, done) =>
    {
        done(null, token.user);
    }
));

module.exports = passport;
