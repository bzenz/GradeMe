const { generateSETParameters } = require('../../utils/sqlGenerators');
const executeOnDB = require('../core/execute');

const editUser = (userId, options={vorname: '', name: '', rolle: '', pwHash: ''}) =>
{
    return new Promise(async (resolve, reject) =>
    {
        try
        {
            if (Object.keys(options).length === 0) {
                // Skip whole procedure, if nothing has to change
                resolve();
                return;
            }
            const { setterString, args } = generateSETParameters(options);
            const updateTaskSQL = `
                UPDATE Users 
                ${setterString} 
                WHERE Id = ?;
            `;
            args.push(userId);

            await executeOnDB(db =>
            {
                return new Promise((userUpdateResolve, userUpdateReject) =>
                {
                    try {
                        console.log(`User ${userId} gets updated`);
                        db.run(updateTaskSQL, args, (err, rows) =>
                        {
                            if (err) throw err;
                            userUpdateResolve(rows);
                        });
                    }
                    catch (e)
                    {
                        userUpdateReject(e);
                    }
                });
            }, true);
            resolve();
        }
        catch (err)
        {
            reject(err);
        }
    });
};

module.exports = editUser;
