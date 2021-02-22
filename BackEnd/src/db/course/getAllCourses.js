const executeOnDB = require('../core/execute');

const getAllCoursesForUser = userId =>
{
    return new Promise(async (resolve, reject) =>
    {
        const sql = `
            SELECT c.Id AS CourseId, c.Year AS Year, s.Id AS SubjectId, s.Name AS SubjectName 
            FROM Courses c, Subjects s, IsIn 
            WHERE c.SubjectId = s.Id AND c.Id = IsIn.CourseId AND IsIn.UserId = ? 
            ORDER BY c.Year DESC, s.Name ASC;
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

exports.getAllCoursesForUser = getAllCoursesForUser;
