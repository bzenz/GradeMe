const createRoutes = require('../createRoutes');
const extractArguments = require('../extractArguments');
const {setDeactivatedForIdInTable} = require("../../db/util/setDeactivatedForIdInTable");
const { getAllUsersForCourse, getAllEvaluatedUsersForTask, getAllUsersForTask, getAllUsers } = require('../../db/user/getAllUsers');
const { getUserById } = require('../../db/user/getUser');
const { registerNewUser } = require('../../passport/registration');
const editUser = require('../../db/user/editUser');
const generatePwHash = require('../../passport/generatePwHash');
const { generateLoginName } = require('../../utils/nameGenerators');

const userRouter =
createRoutes([
    {
        path: '/create',
        method: 'post',
        strategy: 'jwt',
        callback: async (req, res, user) =>
        {
            try
            {
                const args = extractArguments(req.body,
                [
                    { key: 'vorname', type: 'string' },
                    { key: 'name', type: 'string' },
                    { key: 'password', type: 'string' }, // Note: password can't consist of only numbers using this method
                    { key: 'rolle', type: 'string' },
                ]);
    
                const newUser = await registerNewUser(args);
    
                return res.status(200).json( newUser );
            }
            catch (err)
            {
                return res.status(400).json( {error: err.message} );
            }

        }
    },
    {
        path: '/edit',
        method: 'post',
        strategy: 'jwt',
        callback: async (req, res, user) =>
        {
            try
            {
                const args = extractArguments(req.body,
                [
                    { key: 'id', type: 'number' },
                    { key: 'vorname', type: 'string', optional: true },
                    { key: 'name', type: 'string', optional: true },
                    { key: 'password', type: 'string', optional: true }, // Note: password can't consist of only numbers using this method
                    { key: 'rolle', type: 'string', optional: true },
                ]);

                const dbArgs = 
                {
                    Vorname: args.vorname,
                    Name: args.name,
                    Type: args.rolle,
                };
    
                if (args.vorname || args.name) 
                {
                    const oldUser = await getUserById(args.id);
                    const vorname = args.vorname || oldUser.Vorname; 
                    const name = args.name || oldUser.Name; 
                    dbArgs.LoginName = await generateLoginName(vorname, name, args.id);
                }
                if (args.password) dbArgs.pwHash = await generatePwHash(args.password);


                await editUser(args.id, dbArgs);
    
                return res.status(200).json( args.id );
            }
            catch (err)
            {
                console.log(err);
                return res.status(400).json( {error: err.message} );
            }

        }
    },
    {
        path: '/setDeactivated',
        method: 'post',
        strategy: 'jwt',
        callback: async (req, res, user) =>
        {
            try
            {
                const args = extractArguments(req.body,
                [
                    { key: 'userId', type: 'number' },
                    { key: 'deactivated', type: 'boolean'}
                ]);
                await setDeactivatedForIdInTable(args.userId, args.deactivated, "Users");
                return res.status(200).json( { deactivatedUserId: args.userId } );
            }
            catch (err)
            {
                return res.status(400).json( {error: err.message} );
            }
        }
    },
    {
        path: '/getAll',
        method: 'post',
        strategy: 'jwt',
        callback: async (req, res, user) =>
        {
            try
            {
                const users = await getAllUsers();
                for (const i in users)
                {
                    const user = users[i];
                    users[i] =
                    {
                        userId: user.Id,
                        loginName: user.LoginName,
                        vorname: user.Vorname,
                        name: user.Name,
                        rolle: user.Type,
                        deactivated: !!user.Deactivated
                    };
                }

                return res.status(200).json( users );
            }
            catch (err)
            {
                return res.status(400).json( {error: err.message} );
            }

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
