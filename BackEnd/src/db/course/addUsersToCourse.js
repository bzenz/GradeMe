const executeOnDB = require("../core/execute")
const getMaxValue = require("../util/getMaxValue")

const addUsersToCourse = (users, courseId) => {
    return new Promise(async (resolve, reject) => {
        const maxId = await getMaxValue("IsIn","Id");
        let nextId = maxId.Value + 1;

        const SQL = `
        INSERT INTO IsIn
        VALUES (?,?,?);`;

        await executeOnDB(db => {
            users.forEach(user => {
                db.run(SQL,[nextId, user.userId, courseId], (err) => {
                    if (err) throw err;
                });
                nextId++;
            })
        }, true)
        resolve();
    });
}

module.exports = addUsersToCourse;
