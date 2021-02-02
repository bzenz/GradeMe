const createRoutes = require('../createRoutes');
const extractArguments = require('../extractArguments');
const { getAllUsersForCourse, getAllEvaluatedUsersForTask, getAllUsersForTask } = require('../../db/getAllUsers');
const { getUserById } = require('../../db/getUser');

const userRouter =
createRoutes([
    {
        path: '/create',
        method: 'post',
        strategy: 'jwt',
        callback: (req, res, user) =>
        {
            let args;
            try
            {
                args = extractArguments(req.body,
                [
                    { key: 'vorname', type: 'string' },
                    { key: 'name', type: 'string' },
                    { key: 'password', type: 'string' }, // Note: password can't consist of only numbers using this method
                    { key: 'rolle', type: 'string' },
                ]);
            }
            catch (err)
            {
                return res.status(400).json( {error: err.message} );
            }

            const id = args.vorname + args.name + Math.ceil(Math.random()*3);

            // TODO: create user and save in DB
            return res.status(200).json( { userId: id } );
        }
    },
    {
        path: '/delete',
        method: 'post',
        strategy: 'jwt',
        callback: (req, res, user) =>
        {
            let args;
            try
            {
                args = extractArguments(req.body,
                [
                    { key: 'userId', type: 'string' },
                ]);
            }
            catch (err)
            {
                return res.status(400).json( {error: err.message} );
            }
            // TODO: delete user from DB
            return res.status(200).json( { deletedUserId: args.userId } );
        }
    },
    {
        path: '/getAll/forCourse',
        method: 'post',
        strategy: 'jwt',
        callback: async (req, res, user) =>
        {
            let args;
            try
            {
                args = extractArguments(req.body,
                [
                    { key: 'courseId', type: 'number' },
                ]);
            }
            catch (err)
            {
                return res.status(400).json( {error: err.message} );
            }

            const users = await getAllUsersForCourse(args.courseId);
            for (const i in users)
            {
                const user = users[i];
                users[i] =
                {
                    userId: user.Id,
                    vorname: user.Vorname,
                    name: user.Name,
                    rolle: user.Type,
                };
            }

            return res.status(200).json( users );
        }
    },
    {
        path: '/getData',
        method: 'post',
        strategy: 'jwt',
        callback: async (req, res, user) =>
        {
            try
            {
                const args = extractArguments(req.body,
                [
                    { key: 'userId', type: 'number' },
                ]);

                const dbUser = await getUserById(args.userId);
                
                const userData =
                {
                    userId: dbUser.Id,
                    loginName: dbUser.LoginName,
                    vorname: dbUser.Vorname,
                    name: dbUser.Name,
                    rolle: dbUser.Type,
                };

                return res.status(200).json( userData );
            }
            catch (err)
            {
                return res.status(400).json( {error: err.message} );
            }
        }
    },
    {
        path: '/getAll/forTask',
        method: 'post',
        strategy: 'jwt',
        callback: async (req, res, user) =>
        {
            let args;
            try
            {
                args = extractArguments(req.body,
                [
                    { key: 'taskId', type: 'number' },
                ]);
            }
            catch (err)
            {
                return res.status(400).json( {error: err.message} );
            }

            const evaluatedUsers = await getAllEvaluatedUsersForTask(args.taskId);
            const users = await getAllUsersForTask(args.taskId);

            for (const i in users)
            {
                const user = users[i];
                const evaluatedUser = evaluatedUsers.find(curUser => user.Id === curUser.Id);

                users[i] =
                {
                    userId: user.Id,
                    vorname: user.Vorname,
                    name: user.Name,
                    rolle: user.Type,
                    evaluation: evaluatedUser ? evaluatedUser.Evaluation : null,
                    annotation: evaluatedUser ? evaluatedUser.Annotation : null,
                };
            }

            return res.status(200).json( users );
        }
    },
]);
module.exports = userRouter;
