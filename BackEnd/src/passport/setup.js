const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt');

// TODO: load users from database (and implement password hashing & salting)
const users = 
{
    'userOne': 
    {
        id: 'userOne',
        password: '$2a$10$QGutvQ6vuD0rF/hwrw88tOJ5KPAJWlqjyIvCmzZRB2UZo4y9rpZZe', // one
    },
    'userTwo': 
    {
        id: 'userTwo',
        password: '$2a$10$9j0i399QbKvOEV3/nQ8g.O6fZ/KC13MXFghRIRI8MPe20J6ArJmMa', // two
    },
};

const findUserById = id => 
{
    return users[id];
};
const saveUser = user => users[user.id] = user;

const bcrypt = require('bcryptjs'),
    passport = require('passport'),
    { Strategy: LocalStrategy } = require('passport-local');

passport.serializeUser((user, done) => 
{
    done(null, user.id);
});

passport.deserializeUser((id, done) => 
{
    const user = findUserById(id);
    done(null, user);
});

passport.use(new LocalStrategy({usernameField: 'id'}, (id, password, done) => 
{
    const user = findUserById(id);
    if (!user) 
    {
        // neuen nutzer erstellen
        const newUser = {
            id,
            password,
        };
        bcrypt.genSalt(10, (err, salt) => 
        {
            bcrypt.hash(newUser.password, salt, (err, hash) => 
            {
                if (err) throw err;
                newUser.password = hash;
                saveUser(newUser);
                return done(null, newUser);
            });
        });
    }
    else 
    {
        // passwort match?
        bcrypt.compare(password, user.password, (err, isMatch) => 
        {
            if (err) throw err;

            if (isMatch) return done(null, user);
            return done(null, false, { message: 'Falsches Passwort!' });
        });
    }
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
