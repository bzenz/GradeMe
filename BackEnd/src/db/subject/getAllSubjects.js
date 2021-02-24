const executeOnDB = require('../core/execute');

const getAllSubjects = () => {
    return new Promise(async (resolve, reject) => {
        const sql = `
        SELECT *
        FROM subjects;
        `;
        await executeOnDB(db => {
            try {
                db.all(sql, [], (err, data) => {
                    if (err) throw err;
                    resolve(data);
                });
            } catch (e) {
                reject(e)
            }
        });
    });
};

exports.getAllSubjects = getAllSubjects;
