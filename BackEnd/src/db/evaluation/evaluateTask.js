const executeOnDB = require('../core/execute');
const getMaxValue = require('../util/getMaxValue');
const { getAllEvaluatedUsersForTask } = require('../user/getAllUsers');

const evaluateTask = (taskId, users) =>
{
    return new Promise(async (resolve, reject) =>
    {
        try
        {
            // Id, UserId, TaskId, Grade, Annotation,
            const updateEvaluationSQL = `
                UPDATE HasEvaluation 
                SET Grade = ?, Annotation = ? 
                WHERE Id = ?;
            `;
            const createEvaluationSQL = `
                INSERT INTO HasEvaluation 
                VALUES (
                ?, ?, ?, ?, ?
                );
            `;

            const evaluatedUsers = await getAllEvaluatedUsersForTask(taskId);
            let nextEvalId = (await getMaxValue('HasEvaluation', 'Id')).Value + 1;
            await executeOnDB(db =>
            {

                const updateEvaluationRunner = db.prepare(updateEvaluationSQL);
                const createEvaluationRunner = db.prepare(createEvaluationSQL);

                for (const user of users)
                {
                    const evaluatedUser = evaluatedUsers.find(curUser => user.userId === curUser.Id);
                    if (evaluatedUser)
                    {
                        // User was already evaluated => update old evaluation
                        console.log(`User ${user.userId} gets updated for task ${taskId}`);
                        const newEval =
                        {
                            Evaluation: user.evaluation !== undefined ? user.evaluation : evaluatedUser.Evaluation,
                            Annotation: user.annotation !== undefined ? user.annotation : evaluatedUser.Annotation,
                        };
                        updateEvaluationRunner.run(
                            // newEval.Evaluation is cast to an Integer
                            newEval.Evaluation |0, newEval.Annotation, evaluatedUser.EvaluationId,
                        );
                    }
                    else
                    {
                        // User was not evaluated => create new evaluation
                        console.log(`User ${user.userId} gets new Evaluation for task ${taskId}`);
                        const newEval =
                        {
                            UserId: user.userId,
                            Evaluation: user.evaluation,
                            Annotation: user.annotation,
                        };
                        createEvaluationRunner.run(
                            // newEval.Evaluation is cast to an Integer
                            nextEvalId++, newEval.UserId, taskId, newEval.Evaluation |0, newEval.Annotation,
                        );
                    }


                }

                createEvaluationRunner.finalize();
                updateEvaluationRunner.finalize();

                resolve();
            }, true);
        }
        catch (err)
        {
            reject(err);
        }
    });
};

module.exports = evaluateTask;
