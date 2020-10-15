
module.exports = (routes=[{path, method, strategy:'local', callback:(req, res, user)=>{}}]) => 
{
    const express = require('express'),
        router = express.Router(),
        passport = require('passport');
    
    for (const route of routes) {
        router[route.method](route.path, (req, res, next) => 
        {

                route.callback(req, res, null);

        });
    }

    return router;
};
