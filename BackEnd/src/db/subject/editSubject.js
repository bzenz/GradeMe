const executeOnDB = require('../core/execute');

const editSubject = (id, name) => {
    return new Promise(async (resolve, reject) => {
        const sql = `
        UPDATE Subjects
        SET Name = ?
        WHERE Id = ?
        `;
        try {
            await executeOnDB( db => {
                db.run(sql, [name, id], (err, row) => {
                    if (err) throw err;
                    resolve();
                });
            }, true);
        } catch (e) {
            reject(e);
        }
    });
}

exports.editSubject = editSubject;
