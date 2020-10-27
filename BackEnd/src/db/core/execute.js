const openDB = require('./open');

module.exports = async (task, writeAccess=false) => 
{
    let db;
    try 
    {
        db = await openDB(writeAccess);
        task(db);
    } 
    catch (err) 
    {
        console.error(err);
    } 
    finally 
    {
        if (db && db.close) db.close();
    }
};
