const createTask = require('../../db/createTask');
const { getAllTasksForCourse, getAllTasksForUser } = require('../../db/getAllTasks');
const createRoutes = require('../createRoutes');
const extractArguments = require('../extractArguments');

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
                    { key: 'title', type: 'string' },
                    { key: 'description', type: 'string' },
                    { key: 'course', type: 'number' }, // Note: password can't consist of only numbers using this method
                    { key: 'deadline', type: 'string' },
                    { key: 'graded', type: 'boolean' },
                ]);
                // TODO: check deadline is date
                
                const taskId = await createTask(
                    args.title, args.description, args.deadline, args.course, args.graded
                );
                return res.status(200).json( { taskId } );
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
        callback: (req, res, user) => 
        {
            try 
            {
                const args = extractArguments(req.body, 
                [
                    { key: 'taskId',        type: 'number' },
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
        method: 'post', 
        strategy: 'jwt',
        callback: async (req, res, user) => 
        {
            try 
            {  
                const args = extractArguments(req.body, 
                [
                    { key: 'courseId', type: 'number' },
                ]);

                const tasks = await getAllTasksForCourse(args.courseId);
                prepareTasks(tasks);
                return res.status(200).json( tasks );
            }
            catch (err) 
            {
                return res.status(400).json( {error: err.message} );
            }
        }
    },
    {
        path: '/getAll/forUser', 
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

                const tasks = await getAllTasksForUser(args.userId);
                prepareTasks(tasks);
                return res.status(200).json( tasks );
            }
            catch (err) 
            {
                return res.status(400).json( {error: err.message} );
            }
        }
    },
]);

const prepareTasks = tasks => 
{
    for (const i in tasks) 
    {
        const task = tasks[i];
        tasks[i] = 
        {
            taskId: task.Id, 
            title: task.Title, 
            description: task.Description, 
            course: task.CourseId, 
            deadline: task.Date, 
            graded: Boolean(task.Graded),
        };
    }
};


module.exports = userRouter;
