const bcrypt = require('bcryptjs');
const createUser = require('../db/user/createUser');

const registerNewUser = userdata =>
{
    return new Promise((resolve, reject) => 
    {
        try 
        {
            bcrypt.genSalt(10, (err, salt) =>
            {
                bcrypt.hash(userdata.password, salt, async (err, hash) =>
                {
                    if (err) throw err;
        
                    const newUser = await createUser(userdata.vorname, userdata.name, userdata.rolle, hash);
                    resolve(newUser);
                });
            });
        }
        catch (e) 
        {
            reject(e);
        }
    });
};

exports.registerNewUser = registerNewUser;
