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
    return Object.values(users).find(user => user.id === id);
};
const findUserByName = name => 
{
    return users[name];
};
const saveUser = user => users[user.name] = user;

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

passport.use(new LocalStrategy({usernameField: 'name'}, (name, password, done) => 
{
    const user = findUserByName(name);
    if (!user) 
    {
        // neuen nutzer erstellen
        const newUser = {
            id: name,
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

module.exports = passport;
