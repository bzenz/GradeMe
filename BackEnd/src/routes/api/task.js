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
                    { key: 'title', type: 'string' },
                    { key: 'description', type: 'string' },
                    { key: 'course', type: 'string' }, // Note: password can't consist of only numbers using this method
                    { key: 'deadline', type: 'string' },
                    { key: 'graded', type: 'boolean' },
                ]);
            }
            catch (err) 
            {
                return res.status(400).json( {error: err.message} );
            }

            // TODO: check deadline is date
            const id = args.title + args.course + Math.ceil(Math.random()*3);

            // TODO: create task and save in DB
            return res.status(200).json( { taskId: id } );
        }
    },
    {
        path: '/edit', 
        method: 'post', 
        strategy: 'jwt', 
        callback: (req, res, user) => 
        {
            let args;
            try 
            {
                args = extractArguments(req.body, 
                [
                    { key: 'taskId',        type: 'string' },
                    { key: 'title',         type: 'string', optional: true },
                    { key: 'description',   type: 'string', optional: true },
                    { key: 'course',        type: 'string', optional: true }, // Note: password can't consist of only numbers using this method
                    { key: 'deadline',      type: 'string', optional: true },
                    { key: 'graded',        type: 'boolean',optional: true },
                ]);
            }
            catch (err) 
            {
                return res.status(400).json( {error: err.message} );
            }

            // TODO: check deadline is date, if exists
            // TODO: edit task in DB
            return res.status(200).json( { taskId: args.taskId } );
        }
    },
    {
        path: '/getAll/forCourse', 
        method: 'get', 
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
            // TODO: get all tasks for course from DB (sorted by deadline)
            return res.status(200).json( [
                {taskId: 'Klausurvorbereitung2019WI111', title: 'Klausurvorbereitung', description: 'Bitte bereitet euch bis zu diesem Termin auf die Klausur vor.', course: '2019WI11', deadline: new Date().toJSON(), graded: false},
                {taskId: 'Wirtschaftsklausur2019WI112', title: 'Wirtschaftsklausur', description: 'Wir schreiben über die EZB.', course: '2019WI11', deadline: new Date().toJSON(), graded: true},
            ] );
        }
    },
    {
        path: '/getAll/forUser', 
        method: 'get', 
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
            // TODO: get all tasks for user from DB (sorted by deadline)
            return res.status(200).json( [
                {taskId: 'Klausurvorbereitung2019WI111', title: 'Klausurvorbereitung', description: 'Bitte bereitet euch bis zu diesem Termin auf die Klausur vor.', course: '2019WI11', deadline: new Date().toJSON(), graded: false},
                {taskId: 'Wirtschaftsklausur2019WI112', title: 'Wirtschaftsklausur', description: 'Wir schreiben über die EZB.', course: '2019WI11', deadline: new Date().toJSON(), graded: true},
                {taskId: 'Deutsch Lieblingsbuch2019DE71', title: 'Deutsch Lieblingsbuch', description: 'Bitte bringt zur nächsten Stunde euer Lieblingsbuch mit. <3', course: '2019DE7', deadline: new Date().toJSON(), graded: false},
            ] );
        }
    },
]);
module.exports = userRouter;
