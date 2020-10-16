const createRoutes = require('../createRoutes');
const extractArguments = require('../extractArguments');

const userRouter = 
createRoutes([
    {
        path: '/evaluateTask', 
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
                    { key: 'users', type: 'object' }, // TODO: check correct content of array
                ]);
            }
            catch (err) 
            {
                return res.status(400).json( {error: err.message} );
            }

            // TODO: evaluate task and save in DB
            return res.status(200).json( { taskId: args.taskId } );
        }
    },
    {
        path: '/getAll/forUser', 
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
            // TODO: get all evaluations for user from DB
            return res.status(200).json( [
                { taskId: 'abcmycourse3', evaluation: 6, annotation: 'gute Arbeit', course: 'mycourse'},
                { taskId: 'klassenarbeit2019EN112', evaluation: 2, annotation: 'Einwandfreie Argumentation', course: '2019EN11'}
            ] );
        }
    },
]);
module.exports = userRouter;
