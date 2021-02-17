const executeOnDB = require('../core/execute');

const getUserById = userId =>
{
    return new Promise(async (resolve, reject) =>
    {
        const sql = `
            SELECT * 
            FROM Users
            WHERE Id = ?;
        `;
        await executeOnDB(db =>
        {
            db.get(sql, [userId], (err, row) =>
            {
                if (err) reject(err);
                resolve(row);
            });
        });
    });
};

const getUserByLoginName = loginName =>
{
    return new Promise(async (resolve, reject) =>
    {
        const sql = `
            SELECT * 
            FROM Users
            WHERE LoginName = ?;
        `;
        await executeOnDB(db =>
        {
            db.get(sql, [loginName], (err, row) =>
            {
                if (err) reject(err);
                resolve(row);
            });
        });
    });
};

exports.getUserById = getUserById;
exports.getUserByLoginName = getUserByLoginName;
