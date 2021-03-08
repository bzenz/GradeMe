const executeOnDB = require('../core/execute');

const setDeactivatedForIdInTable = (id, deactivated, table) => {
    return new Promise( async (resolve, reject) => {
        try {
            const sql = `
                UPDATE ${table}
                SET Deactivated = ?
                WHERE Id = ?;
            `;
            await  executeOnDB( db => {
                return new Promise((dbResolve, dbReject) => {
                    try {
                        console.log(`${table} with id ${id} deactivation set to ${deactivated}`);
                        db.run(sql, [deactivated, id], (err, rows) => {
                            if (err) throw err;
                            dbResolve(rows);
                        });
                    } catch (e) {
                        dbReject(e);
                    }
                });
            }, true);
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

exports.setDeactivatedForIdInTable = setDeactivatedForIdInTable;
