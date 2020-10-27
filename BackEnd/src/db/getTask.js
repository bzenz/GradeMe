const executeOnDB = require('./core/execute');

const getTask = taskId => 
{
    return new Promise(async (resolve, reject) => 
    {
        const sql = `
            SELECT * 
            FROM Tasks
            WHERE Id = ?;
        `;
        await executeOnDB(db => 
        {
            db.get(sql, [taskId], (err, row) => 
            {
                if (err) reject(err);
                resolve(row);
            });
        });
    });
};

module.exports = getTask;
