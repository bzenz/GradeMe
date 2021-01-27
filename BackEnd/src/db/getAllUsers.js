const executeOnDB = require('./core/execute');

const getAllUsers = () => 
{
    return new Promise(async (resolve, reject) => 
    {
        const sql = `
            SELECT Id, LoginName, Vorname, Name, Type 
            FROM Users;
        `;
        await executeOnDB(db => 
        {
            db.all(sql, [], (err, row) => 
            {
                if (err) reject(err);
                resolve(row);
            });
        });
    });
};

const getAllUsersForCourse = courseId => 
{
    return new Promise(async (resolve, reject) => 
    {
        const sql = `
            SELECT UserId as Id, Vorname, Name, Type 
            FROM Users u, Courses c, IsIn
            WHERE u.Id = IsIn.UserId AND c.Id = IsIn.CourseId AND c.Id = ?
            ORDER BY Name ASC, Vorname ASC;
        `;
        await executeOnDB(db => 
        {
            db.all(sql, [courseId], (err, row) => 
            {
                if (err) reject(err);
                resolve(row);
            });
        });
    });
};

const getAllUsersForTask = taskId => 
{
    return new Promise(async (resolve, reject) => 
    {
        const sql = `
            SELECT u.Id AS Id, Vorname, Name, Type
            FROM Users u, Tasks t, Courses c, IsIn 
            WHERE t.Id = ? AND t.CourseId = c.Id AND u.Id = IsIn.UserId AND c.Id = IsIn.CourseId
            ORDER BY Name ASC, Vorname ASC;
        `;
        await executeOnDB(db => 
        {
            db.all(sql, [taskId], (err, row) => 
            {
                if (err) reject(err);
                resolve(row);
            });
        });
    });
};
const getAllEvaluatedUsersForTask = taskId => 
{
    return new Promise(async (resolve, reject) => 
    {
        const sql = `
            SELECT u.Id AS Id, Vorname, Name, Type, HasEvaluation.Grade AS Evaluation, HasEvaluation.Annotation AS Annotation, HasEvaluation.Id AS EvaluationId 
            FROM Users u, Tasks t, Courses c, IsIn, HasEvaluation 
            WHERE t.Id = ? AND t.CourseId = c.Id AND u.Id = IsIn.UserId AND c.Id = IsIn.CourseId AND u.Id = HasEvaluation.UserId AND t.Id = HasEvaluation.TaskId;
        `;
        await executeOnDB(db => 
        {
            db.all(sql, [taskId], (err, row) => 
            {
                if (err) reject(err);
                resolve(row);
            });
        });
    });
};

exports.getAllUsers = getAllUsers;
exports.getAllUsersForCourse = getAllUsersForCourse;
exports.getAllUsersForTask = getAllUsersForTask;
exports.getAllEvaluatedUsersForTask = getAllEvaluatedUsersForTask;
