const evaluateTask = require('../../db/evaluation/evaluateTask');
const { getAllEvaluationsForUser, getAllEvaluationsForTask } = require('../../db/evaluation/getAllEvaluations');
const { generateCourseName } = require('../../utils/nameGenerators');
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
                        taskTitle: eval.TaskTitle,
                        evaluation: eval.Graded ? eval.Evaluation : Boolean(eval.Evaluation),
                        annotation: eval.Annotation,
                        courseId: eval.CourseId,
                        courseName: generateCourseName(eval.SubjectName, eval.Year),
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
    {
        path: '/getAll/forTask',
        method: 'post',
        strategy: 'jwt',
        callback: async (req, res, user) =>
        {
            try
            {
                const args = extractArguments(req.body,
                [
                    { key: 'taskId', type: 'number' },
                ]);

                const evaluations = await getAllEvaluationsForTask(args.taskId);

                for (const i in evaluations)
                {
                    const eval = evaluations[i];
                    evaluations[i] =
                    {
                        userId: eval.UserId,
                        userVorname: eval.UserVorname,
                        userName: eval.UserName,
                        evaluation: eval.Graded ? eval.Evaluation : Boolean(eval.Evaluation),
                        annotation: eval.Annotation,
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
