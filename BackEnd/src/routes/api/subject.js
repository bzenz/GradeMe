const createRoutes = require('../createRoutes');
const extractArguments = require('../extractArguments');
const {getAllSubjects} = require('../../db/subject/getAllSubjects');
const {deactivateIdInTable} = require('../../db/util/deactivateIdInTable');

const userRouter = 
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
                ]);
            }
            catch (err) 
            {
                return res.status(400).json( {error: err.message} );
            }

            const id = Math.floor(Math.random()*15+5);

            // TODO: create subject and save in DB
            return res.status(200).json( { subjectId: id } );
        }
    },
    {
        path: '/deactivate',
        method: 'post',
        strategy: 'jwt',
        callback: async (req, res, user) =>
        {
            try
            {
                const args = extractArguments(req.body,
                [
                    { key: 'subjectId', type: 'number' },
                ]);
                await deactivateIdInTable(args.subjectId, "Subjects");
                return res.status(200).json( { deactivatedSubjectId: args.subjectId } );
            }
            catch (err) 
            {
                return res.status(400).json( {error: err.message} );
            }
        }
    },
]);
module.exports = userRouter;
