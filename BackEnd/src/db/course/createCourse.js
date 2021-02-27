const checkCourseExists = require('./checkCourseExists');
const executeOnDB = require('../core/execute');
const getMaxValue = require('../util/getMaxValue');

const createCourse = (subjectId, year) =>
{
    return new Promise(async (resolve, reject) =>
    {
        try
        {
            const newId = (await getMaxValue('Courses', 'Id')).Value + 1;

            const courseInDB = await checkCourseExists(subjectId, year);
            if (courseInDB) throw new Error(`A course with the subject ${subjectId} and the year ${year} already exists!`);

            // (Id, SubjectId, Year)
            const sql = `
            INSERT INTO Courses 
            VALUES (?, ?, ?);
            `;
            console.log(`Create new course ${newId} for year ${year}`);
            await executeOnDB(db =>
            {
                const runner = db.prepare(sql);
                runner.run(
                    newId, subjectId, year
                    );
                runner.finalize();
            }, true);
            resolve(newId);
        }
        catch (err)
        {
            reject(err);
        }
    });
};

module.exports = createCourse;
