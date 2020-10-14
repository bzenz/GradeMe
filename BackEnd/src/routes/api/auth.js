const jwt = require('jsonwebtoken');
const createRoutes = require('../createRoutes');

const authRouter = 
createRoutes([
    {
        path: '/login', 
        method: 'post', 
        strategy: 'local',
        callback: (req, res, user) => 
        {
            req.logIn(user, { session: false }, err => 
                {
                    if (err) return res.status(400).json({ errors: err });

                    const userId = user.id;
                    const rolle = user.id === 'userOne' ? 'teacher' : 'student';

                    const body = { _id: userId };
                    const request_token = jwt.sign({ user: body }, 'TOP_SECRET');

                    return res.status(200).json({ userId, rolle, request_token });
                }
            );
        }
    },
    {
        path: '/woAmI', 
        method: 'get', 
        strategy: 'jwt',
        callback: (req, res, user) => 
        {
            // TODO: get vorname and name from DB
            return res.status(200).json({ userId: user._id, vorname: "Max", name: "Mustermann" });
        }
    },
]);

module.exports = authRouter;
