const { getAllCoursesForUser } = require('../../db/getAllCourses');
const createRoutes = require('../createRoutes');
const extractArguments = require('../extractArguments');

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
                    { key: 'year', type: 'number' },
                    { key: 'subjectId', type: 'number' },
                ]);
            }
            catch (err) 
            {
                return res.status(400).json( {error: err.message} );
            }

            const id = Math.ceil(Math.random()*30);

            // TODO: create task and save in DB
            return res.status(200).json( { courseId: id } );
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
]);
module.exports = userRouter;
