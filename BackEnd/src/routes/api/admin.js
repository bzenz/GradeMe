const createRoutes = require('../createRoutes');
const extractArguments = require('../extractArguments');

const adminRouter = 
createRoutes([
    {
        path: '/create', 
        method: 'post', 
        strategy: 'jwt', 
        callback: (req, res, user) => 
        {
            let args;
            try 
            {  
                args = extractArguments(req.body, 
                [
                    { key: 'name', type: 'string' },
                    { key: 'password', type: 'string' }, // Note: password can't consist of only numbers using this method
                ]);
            }
            catch (err) 
            {
                return res.status(400).json( {error: err.message} );
            }

            const id = args.name + Math.ceil(Math.random()*3);

            // TODO: create admin and save in DB
            return res.status(200).json( { adminId: id } );
        }
    },
    {
        path: '/delete', 
        method: 'post', 
        strategy: 'jwt',
        callback: (req, res, user) => 
        {
            let args;
            try 
            {  
                args = extractArguments(req.body, 
                [
                    { key: 'adminId', type: 'string' },
                ]);
            }
            catch (err) 
            {
                return res.status(400).json( {error: err.message} );
            }
            // TODO: delete admin from DB
            return res.status(200).json( { deletedAdminId: args.adminId } );
        }
    }
]);
module.exports = adminRouter;
