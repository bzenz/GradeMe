const executeOnDB = require('./core/execute');

const getAllEvaluationsForUser = userId => 
{
    return new Promise(async (resolve, reject) => 
    {
        const sql = `
            SELECT HasEvaluation.TaskId AS TaskId, HasEvaluation.Grade AS Evaluation, t.Graded AS Graded, HasEvaluation.Annotation AS Annotation, t.CourseId AS CourseId 
            FROM HasEvaluation, Tasks t 
            WHERE HasEvaluation.UserId = ? AND HasEvaluation.TaskId = t.Id
            ORDER BY date(t.Date) ASC;
        `;
        await executeOnDB(db => 
        {
            db.all(sql, [userId], (err, row) => 
            {
                if (err) reject(err);
                resolve(row);
            });
        });
    });
};

exports.getAllEvaluationsForUser = getAllEvaluationsForUser;
