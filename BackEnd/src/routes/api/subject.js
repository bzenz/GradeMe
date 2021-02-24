const createRoutes = require('../createRoutes');
const extractArguments = require('../extractArguments');
const {createSubject} = require("../../db/subject/createSubject");

const userRouter =
createRoutes([
    {
        path: '/create',
        method: 'post',
        strategy: 'jwt',
        callback: async (req, res, user) =>
        {
            try
            {
                const args = extractArguments(req.body,
                [
                    { key: 'name', type: 'string' },
                ]);
                const id = await createSubject(args.name);
                return res.status(200).json( { subjectId: id } );
            }
            catch (err) 
            {
                return res.status(400).json( {error: err.message} );
            }
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
                    { key: 'subjectId', type: 'number' },
                ]);
            }
            catch (err) 
            {
                return res.status(400).json( {error: err.message} );
            }
            // TODO: delete subject from DB
            return res.status(200).json( { deletedSubjectId: args.subjectId } );
        }
    },
]);
module.exports = userRouter;
