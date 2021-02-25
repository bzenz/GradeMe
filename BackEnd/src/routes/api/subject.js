const createRoutes = require('../createRoutes');
const extractArguments = require('../extractArguments');
const {deactivateIdInTable} = require('../../db/util/deactivateIdInTable');
const {editSubject} = require("../../db/subject/editSubject");
const {createSubject} = require("../../db/subject/createSubject");
const {getAllSubjects} = require('../../db/subject/getAllSubjects')

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
    {
        path: '/getAll',
        method: 'post',
        strategy: 'jwt',
        callback: async (req, res, user) => {
            try{
                const subjects = await getAllSubjects();
                const refinedSubjects = subjects.map(subject => ({
                        subjectId: subject.Id,
                        subjectName: subject.Name,
                        deactivated: !!subject.Deactivated
                    }));
                return res.status(200).json( refinedSubjects )
            } catch (e) {
                return res.status(400).json({error: e.message})
            }
        }
    },
    {
        path: '/edit',
        method: 'post',
        strategy: 'jwt',
        callback: async (req, res, user) => {
            try{
                const args = extractArguments(req.body,
                    [
                        { key: 'subjectId', type: 'number' },
                        { key: 'newName', type: 'string'}
                    ]);
                await editSubject(args.subjectId, args.newName);
                return res.status(200).json( {editedSubjectId: args.subjectId} )
            } catch (e) {
                return res.status(400).json({error: e.message})
            }
        }
    }
]);
module.exports = userRouter;
