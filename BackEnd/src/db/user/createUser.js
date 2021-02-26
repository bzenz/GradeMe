const { generateLoginName } = require('../../utils/nameGenerators');
const executeOnDB = require('../core/execute');
const getMaxValue = require('../util/getMaxValue');

const createUser = (vorname, name, type, pwHash) =>
{
    return new Promise(async (resolve, reject) =>
    {
        try
        {
            const nextId = (await getMaxValue('Users', 'Id')).Value + 1;
            const loginName = await generateLoginName(vorname, name);

            // (Id, Title, Description, Date, CourseId, Graded)
            const sql = `
            INSERT INTO Users 
            VALUES (?, ?, ?, ?, ?, ?, ?);
            `;
            console.log(`Create new User ${vorname} ${name} (${nextId}) as ${type}`);
            await executeOnDB(db =>
            {
                db.run(sql, [nextId, loginName, vorname, name, type, pwHash, false], (err, row) => {
                    if (err) throw err;
                });
            }, true);
            resolve({userId: nextId, loginName, vorname, name, rolle: type});
        }
        catch (err)
        {
            reject(err);
        }
    });
};

module.exports = createUser;
