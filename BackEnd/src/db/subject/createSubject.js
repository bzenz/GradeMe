const executeOnDB = require('../core/execute');
const getMaxValue = require('../util/getMaxValue');

const createSubject = (name) => {
    return new Promise( async (resolve, reject) => {
        try {
            const nextId = (await getMaxValue('Subjects', 'Id')).Value +1;
            const sql = `
            INSERT INTO Subjects(Id, Name, Deactivated)
            VALUES (?, ?, false)
            `;
            console.log(`Fach ${name} mit der Id ${nextId} hinzufügen`);
            await executeOnDB( db => {
                db.run(sql, [nextId, name], (err, row) => {
                    if (err) throw err;
                });
            }, true);
            resolve(nextId);
        } catch (e) {
            reject(e);
        }
    });
};

exports.createSubject = createSubject;
