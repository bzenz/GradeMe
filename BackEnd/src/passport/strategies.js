const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcryptjs');

const { getUserByLoginName } = require('../db/user/getUser');

const setupStrategies = passport => 
{
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
};

exports.setupStrategies = setupStrategies;
