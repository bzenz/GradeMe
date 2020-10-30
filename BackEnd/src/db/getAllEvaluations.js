const executeOnDB = require('./core/execute');

const getAllEvaluationsForUser = userId => 
{
    return new Promise(async (resolve, reject) => 
    {
        const sql = `
            SELECT HasEvaluation.TaskId AS TaskId, HasEvaluation.Grade AS Evaluation, t.Graded AS Graded, HasEvaluation.Annotation AS Annotation, t.CourseId AS CourseId, c.Year AS Year, s.Id AS SubjectId, s.Name AS SubjectName 
            FROM HasEvaluation, Tasks t, Courses c, Subjects s 
            WHERE HasEvaluation.UserId = ? AND HasEvaluation.TaskId = t.Id AND t.CourseId = c.Id AND c.SubjectId = s.Id 
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
