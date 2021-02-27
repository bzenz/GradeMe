const executeOnDB = require('../core/execute');

const deactivateIdInTable = (id, table) => {
    return new Promise( async (resolve, reject) => {
        try {
            const sql = `
                UPDATE ${table}
                SET Deactivated = true
                WHERE Id = ?;
            `;
            await  executeOnDB( db => {
                return new Promise((dbResolve, dbReject) => {
                    try {
                        console.log(`${table} ${id} gets deactivated`);
                        db.run(sql, [id], (err, rows) => {
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

exports.deactivateIdInTable = deactivateIdInTable;
