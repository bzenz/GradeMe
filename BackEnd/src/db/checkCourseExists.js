const executeOnDB = require('./core/execute');

const checkCourseExists = (subjectId, year) => 
{
    return new Promise(async (resolve, reject) => 
    {
        if (typeof subjectId !== 'number' || subjectId < 0) throw new Error('subjectId must be a positive number');
        if (typeof year !== 'number') throw new Error('year must be a number');
        
        
        const sql = `
            SELECT Id 
            FROM Courses 
            WHERE SubjectId = ? AND Year = ?;
        `;
        await executeOnDB(db => 
        {
            db.get(sql, [subjectId, year], (err, course) => 
            {
                if (err) reject(err);
                resolve(Boolean(course));
            });
        });
    });
};

module.exports = checkCourseExists;
