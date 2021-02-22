const { generateSETParameters } = require('../../utils/sqlGenerators');
const executeOnDB = require('../core/execute');

const editTask = (taskId, options={title, description, deadline}) =>
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
                UPDATE Tasks 
                ${setterString} 
                WHERE Id = ?;
            `;
            args.push(taskId);

            await executeOnDB(db =>
            {
                return new Promise((taskUpdateResolve, taskUpdateReject) =>
                {
                    try {
                        console.log(`Task ${taskId} gets updated`);
                        db.run(updateTaskSQL, args, (err, rows) =>
                        {
                            if (err) throw err;
                            taskUpdateResolve(rows);
                        });
                    }
                    catch (e)
                    {
                        taskUpdateReject(e);
                    }
                })
            }, true);
            resolve();
        }
        catch (err)
        {
            reject(err);
        }
    });
};

module.exports = editTask;
