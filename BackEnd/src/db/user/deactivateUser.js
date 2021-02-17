const executeOnDB = require('../core/execute');

const deactivateUser = userId =>
{
    return new Promise(async (resolve, reject) =>
    {
        const sql = `
            UPDATE users 
            SET Deactivated=true 
            WHERE Id=?
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

exports.deactivateUser = deactivateUser;
