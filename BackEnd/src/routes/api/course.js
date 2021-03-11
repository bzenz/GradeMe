const createCourse = require('../../db/course/createCourse');
const { getAllCoursesForUser, getAllCourses } = require('../../db/course/getAllCourses');
const getSubject = require('../../db/subject/getSubject');
const { generateCourseName } = require('../../utils/nameGenerators');
const createRoutes = require('../createRoutes');
const extractArguments = require('../extractArguments');

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
        path: '/getAll',
        method: 'post',
        strategy: 'jwt',
        callback: async (req, res, user) =>
        {
            try
            {
                const courses = await getAllCourses().catch(err=>{throw err});

                const refinedCourses = courses.map(course => {
                    return {
                        courseId: course.CourseId,
                        courseName: generateCourseName(course.SubjectName, course.Year),
                        year: course.Year,
                        subjectId: course.SubjectId,
                        subjectName: course.SubjectName,
                    };
                });

                return res.status(200).json( refinedCourses );
            }
            catch (err)
            {
                return res.status(400).json( {error: err.message} );
            }
        }
    },
]);
module.exports = userRouter;
