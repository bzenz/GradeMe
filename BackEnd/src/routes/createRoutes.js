
module.exports = (routes=[{path, method, strategy:'local', callback:(req, res, user)=>{}}]) => 
{
    const express = require('express'),
        router = express.Router(),
        passport = require('passport');
    
    for (const route of routes) {
        router[route.method](route.path, (req, res, next) => 
        {
            passport.authenticate(route.strategy, {session: false}, (err, user, info) =>
            {
                if (err) return res.status(400).json({ errors: err });

                if (!user) return res.status(400).json({ errors: info.message });

                route.callback(req, res, user);
            })(req, res, next);
        });
    }

    return router;
};
