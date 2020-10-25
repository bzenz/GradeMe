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
                    { key: 'subjectId', type: 'number' },
                ]);
            }
            catch (err) 
            {
                return res.status(400).json( {error: err.message} );
            }

            const id = Math.ceil(Math.random()*30);

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
                    { key: 'userId', type: 'number' },
                ]);
            }
            catch (err) 
            {
                return res.status(400).json( {error: err.message} );
            }
            // TODO: get all courses for user from DB
            return res.status(200).json( [
                {courseId: 1, year: 2019, subjectId: 0, subjectName: 'Wirtschaft'},
                {courseId: 2, year: 2019, subjectId: 1, subjectName: 'Englisch'},
                {courseId: 4, year: 2019, subjectId: 3, subjectName: 'Deutsch'},
            ] );
        }
    },
]);
module.exports = userRouter;
