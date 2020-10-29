const evaluateTask = require('../../db/evaluateTask');
const { getAllEvaluationsForUser } = require('../../db/getAllEvaluations');
const createRoutes = require('../createRoutes');
const extractArguments = require('../extractArguments');

const userRouter = 
createRoutes([
    {
        path: '/evaluateTask', 
        method: 'post', 
        strategy: 'jwt', 
        callback: async (req, res, user) => 
        {
            try 
            {
                const args = extractArguments(req.body, 
                [
                    { key: 'taskId', type: 'number' },
                    { key: 'users', type: 'object' }, // TODO: check correct content of array
                ]);

               await evaluateTask(args.taskId, args.users);

                return res.status(200).json( { taskId: args.taskId } );
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

                const evaluations = await getAllEvaluationsForUser(args.userId);
                
                for (const i in evaluations) 
                {
                    const eval = evaluations[i];
                    evaluations[i] = 
                    {
                        taskId: eval.TaskId,
                        evaluation: eval.Graded ? eval.Evaluation : Boolean(eval.Evaluation),
                        annotation: eval.Annotation,
                        course: eval.CourseId,
                        year: eval.Year, 
                        subjectId: eval.SubjectId, 
                        subjectName: eval.SubjectName, 
                    };
                }
                
                return res.status(200).json( evaluations );
            }
            catch (err) 
            {
                return res.status(400).json( {error: err.message} );
            }
        }
    },
]);
module.exports = userRouter;
