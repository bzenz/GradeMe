const executeOnDB = require('../core/execute');

const getAllSubjects = () => {
    return new Promise(async (resolve, reject) => {
        const sql = `
        SELECT *
        FROM subjects;
        `;
        await executeOnDB(db => {
            db.all(sql, [], (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });
    });
};

exports.getAllSubjects = getAllSubjects;
