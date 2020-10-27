const jwt = require('jsonwebtoken');
const createRoutes = require('../createRoutes');
const { getUserById } = require('../../db/getUser');

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

                    const userId = user.Id;
                    const rolle = user.Type;

                    const body = { _id: userId };
                    const request_token = jwt.sign({ user: body }, 'TOP_SECRET');

                    return res.status(200).json({ userId, rolle, request_token });
                }
            );
        }
    },
    {
        path: '/woAmI', 
        method: 'post', 
        strategy: 'jwt',
        callback: async (req, res, user) => 
        {
            const userFromDB = await getUserById(user._id);

            if (!userFromDB) return res.status(400).json({ errors: 'Benutzer nicht gefunden.' });

            return res.status(200).json(
                { userId: user._id, vorname: userFromDB.Vorname, name: userFromDB.Name }
            );
        }
    },
]);

module.exports = authRouter;
