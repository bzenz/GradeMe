const executeOnDB = require('../core/execute');

const getSubject = subjectId =>
{
    return new Promise(async (resolve, reject) =>
    {
        if (typeof subjectId !== 'number' || subjectId < 0) throw new Error('subjectId must be a positive number');
        const sql = `
            SELECT * 
            FROM Subjects
            WHERE Id = ?;
        `;
        await executeOnDB(db =>
        {
            db.get(sql, [subjectId], (err, row) =>
            {
                if (err) reject(err);
                resolve(row);
            });
        });
    });
};

module.exports = getSubject;
