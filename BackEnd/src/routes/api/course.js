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
                    { key: 'year', type: 'number' },
                    { key: 'subjectId', type: 'string' },
                ]);
            }
            catch (err) 
            {
                return res.status(400).json( {error: err.message} );
            }

            const id = args.year + args.subjectId + Math.ceil(Math.random()*3);

            // TODO: create task and save in DB
            return res.status(200).json( { courseId: id } );
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
            // TODO: get all courses for user from DB
            return res.status(200).json( [
                {courseId: '2019WI2', year: 2019, subjectId: 'WI', subjectName: 'Wirtschaft'},
                {courseId: '2019EN1', year: 2019, subjectId: 'EN', subjectName: 'Englisch'},
                {courseId: '2019DE1', year: 2019, subjectId: 'DE', subjectName: 'Deutsch'},
            ] );
        }
    },
]);
module.exports = userRouter;
