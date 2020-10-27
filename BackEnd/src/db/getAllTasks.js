const executeOnDB = require('./core/execute');

const getAllTasksForCourse = courseId => 
{
    return new Promise(async (resolve, reject) => 
    {
        const sql = `
            SELECT Id, Title, Description, CourseId, Date, Graded 
            FROM Tasks t 
            WHERE CourseId = ?
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
            SELECT t.Id, t.Title, t.Description, t.CourseId, t.Date, t.Graded 
            FROM Tasks t, Courses c, IsIn 
            WHERE ? = IsIn.UserId AND c.Id = IsIn.CourseId AND t.CourseId = c.Id
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
