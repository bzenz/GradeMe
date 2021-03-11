const createCourse = require('../../db/course/createCourse');
const { getAllCoursesForUser } = require('../../db/course/getAllCourses');
const getSubject = require('../../db/subject/getSubject');
const { generateCourseName } = require('../../utils/nameGenerators');
const createRoutes = require('../createRoutes');
const extractArguments = require('../extractArguments');
const removeUsersFromCourse = require("../../db/course/removeUsersFromCourse");

const userRouter =
createRoutes([
    {
        path: '/create',
        method: 'post',
        strategy: 'jwt',
        callback: async (req, res, user) =>
        {
            let args;
            try
            {
                args = extractArguments(req.body,
                [
                    { key: 'year', type: 'number' },
                    { key: 'subjectId', type: 'number' },
                ]);
                const subject = await getSubject(args.subjectId);
                if (!subject) throw new Error(`There is no subject with id ${args.subjectId}`);
                const id = await createCourse(args.subjectId, args.year);
                return res.status(200).json( { courseId: id, courseName: generateCourseName(subject.Name, args.year) } );
            }
            catch (err)
            {
                return res.status(400).json( {error: err.message} );
            }
        }
    },
    {
        path: '/getAll/forUser',
        method: 'post',
        strategy: 'jwt',
        callback: async (req, res, user) =>
        {
            try
            {
                const args = extractArguments(req.body,
                [
                    { key: 'userId', type: 'number' },
                ]);

                const courses = await getAllCoursesForUser(args.userId);

                for (const i in courses)
                {
                    const course = courses[i];
                    courses[i] =
                    {
                        courseId: course.CourseId,
                        courseName: generateCourseName(course.SubjectName, course.Year),
                        year: course.Year,
                        subjectId: course.SubjectId,
                        subjectName: course.SubjectName,
                    };
                }

                return res.status(200).json( courses );
            }
            catch (err)
            {
                return res.status(400).json( {error: err.message} );
            }
        }
    },
    {
        path: '/users/remove',
        method: 'post',
        strategy: 'jwt',
        callback: async (req, res, user) =>
        {
            try
            {
                const args = extractArguments(req.body,
                    [
                        { key: 'courseId', type: 'number' },
                        { key: 'users', type: 'object'} //TODO check correct array content
                    ]);

                await removeUsersFromCourse(args.users, args.courseId).catch(err => {throw err});


                return res.status(200).json( args.courseId );
            }
            catch (err)
            {
                return res.status(400).json( {error: err.message} );
            }
        }
    },
]);
module.exports = userRouter;
