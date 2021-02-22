const executeOnDB = require('../core/execute');

const deactivateUser = userId =>
{
    return new Promise(async (resolve, reject) =>
    {
        try {
            const deactivatuserSql = `
                UPDATE users
                SET Deactivated= true
                WHERE Id = ?;
            `;
            await executeOnDB(db => {
                return new Promise((deactivatUserResolve, deactivateUserReject) => {
                    try {
                        console.log(`User ${userId} gets updated`);
                        db.run(deactivatuserSql, userId, (err, rows) => {
                            if (err) throw err;
                            deactivatUserResolve(rows);
                        });
                    } catch (e) {
                        deactivateUserReject(e);
                    }
                })
            }, true);
            resolve();
        } catch (e) {
            reject(e);
        }
    });

};

exports.deactivateUser = deactivateUser;
