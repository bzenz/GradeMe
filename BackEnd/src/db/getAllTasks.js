const executeOnDB = require('./core/execute');

const getAllTasksForCourse = courseId => 
{
    return new Promise(async (resolve, reject) => 
    {
        const sql = `
            SELECT t.Id AS Id, t.Title AS Title, t.Description AS Description, t.CourseId AS CourseId, t.Date AS Date, t.Graded AS Graded, c.Year AS CourseYear, s.Name AS SubjectName 
            FROM Tasks t, Courses c, Subjects s 
            WHERE t.CourseId = ? AND t.CourseId = c.Id AND c.SubjectId = s.Id 
            ORDER BY date(Date) ASC;
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

const getAllTasksForUser = userId => 
{
    return new Promise(async (resolve, reject) => 
    {
        const sql = `
            SELECT t.Id, t.Title, t.Description, t.CourseId, t.Date, t.Graded, c.Year AS CourseYear, s.Name AS SubjectName 
            FROM Tasks t, Courses c, Subjects s, IsIn 
            WHERE ? = IsIn.UserId AND c.Id = IsIn.CourseId AND t.CourseId = c.Id AND c.SubjectId = s.Id 
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

exports.getAllTasksForCourse = getAllTasksForCourse;
exports.getAllTasksForUser = getAllTasksForUser;
