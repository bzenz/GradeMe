const executeOnDB = require('./core/execute');

const getMaxValue = (table, column) => 
{
    return new Promise(async (resolve, reject) => 
    {
        // Normalerweise sollte man niemals variablen in eine SQL Abfrage packen. 
        // Ist in diesem Fall aber in Ordnung, da das nicht von einem Nutzer sondern von anderem Code ausgefüllt wird.
        // Die ? Parameter funktionieren in diesem Fall leider nicht.
        const sql = `
            SELECT max(${column}) AS Value 
            FROM ${table};
        `;
        await executeOnDB(db => 
        {
            db.get(sql, (err, row) => 
            {
                if (err) reject(err);
                resolve(row);
            });
        });
    });
};

module.exports = getMaxValue;
