const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const DBPath = path.resolve(__dirname, '../../../../DB/gradeMe.db');

module.exports = (writeAccess=false) => 
{
    return new Promise((resolve, reject) => 
    {
        try 
        {
            const db = new sqlite3.Database(DBPath, writeAccess ? sqlite3.OPEN_READWRITE : sqlite3.OPEN_READONLY, err => 
            { 
                if (err) reject(err);
            });

            db.serialize(() => resolve(db));
        } 
        catch (err)
        {
            reject(err);
        }

    });
};
