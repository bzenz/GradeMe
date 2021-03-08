
const createUser = require('../db/user/createUser');
const generatePwHash = require('./generatePwHash');

const registerNewUser = async userdata =>
{
    const hash = await generatePwHash(userdata.password);
    const newUser = await createUser(userdata.vorname, userdata.name, userdata.rolle, hash);
    return newUser;
};

exports.registerNewUser = registerNewUser;
