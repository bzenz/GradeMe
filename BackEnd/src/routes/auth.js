const express = require('express'),
    router = express.Router(),
    passport = require('passport');

router.post('/login', (req, res, next) => 
{
    passport.authenticate('local', (err, user, info) => 
    {
        if (err) return res.status(400).json({ errors: err });

        if (!user) return res.status(400).json({ errors: 'Keinen Benutzer gefunden.' });

        req.logIn(user, err => 
            {
                if (err) return res.status(400).json({ errors: err });

                return res.status(200).json({ success: `logged in as ${user.id}` });
            });
    })(req, res, next);
});

module.exports = router;
