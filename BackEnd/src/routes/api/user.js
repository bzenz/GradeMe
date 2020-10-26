const createRoutes = require('../createRoutes');
const extractArguments = require('../extractArguments');

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
        callback: (req, res, user) => 
        {
            let args;
            try 
            {  
                args = extractArguments(req.body, 
                [
                    { key: 'courseId', type: 'string' },
                ]);
            }
            catch (err) 
            {
                return res.status(400).json( {error: err.message} );
            }
            // TODO: get all users for Course from DB
            return res.status(200).json( [
                {userId: 'BenitoZenz2', vorname: 'Benito', name: 'Zenz', rolle: 'teacher'},
                {userId: 'RobinHoentsch1', vorname: 'Robin', name: 'Hoentsch', rolle: 'student'},
            ] );
        }
    },
    {
        path: '/getAll/forTask', 
        method: 'post', 
        strategy: 'jwt',
        callback: (req, res, user) => 
        {
            let args;
            try 
            {  
                args = extractArguments(req.body, 
                [
                    { key: 'taskId', type: 'string' },
                ]);
            }
            catch (err) 
            {
                return res.status(400).json( {error: err.message} );
            }
            // TODO: get all users and corresponding evaluations for Task from DB
            return res.status(200).json( [
                {userId: 'kevinmorgenthaler', vorname: 'Kevin', name: 'Morgenthaler', rolle: 'student', evaluation: null, annotation: null},
                {userId: 'florianlemnitzer', vorname: 'Florian', name: 'Lemnitzer', rolle: 'student', evaluation: null, annotation: null},
                {userId: 'benitozenz', vorname: 'Benito', name: 'Zenz', rolle: 'teacher', evaluation: null, annotation: null},
                {userId: 'robinhoentsch2', vorname: 'Robin', name: 'Hoentsch', rolle: 'student', evaluation: 1, annotation: 'Sauber wie immer, Robbi Rob. Echt gute Arbeit.'},
            ] );
        }
    },
]);
module.exports = userRouter;
