const bcrypt = require('bcryptjs');

module.exports = password => 
{
    return new Promise((resolve, reject) => 
    {
        try 
        {
            bcrypt.genSalt(10, (err, salt) =>
            {
                if (err) throw err;
                bcrypt.hash(password, salt, async (err, hash) =>
                {
                    if (err) throw err;
                    
                    resolve(hash);
                });
            });
        }
        catch (e) 
        {
            reject(e);
        }
    });
};
