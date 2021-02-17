const executeOnDB = require('../core/execute');
const getMaxValue = require('../util/getMaxValue');

const createTask = (title, description, date, courseId, graded) =>
{
    return new Promise(async (resolve, reject) =>
    {
        try
        {
            const newId = (await getMaxValue('Tasks', 'Id')).Value + 1;

            // (Id, Title, Description, Date, CourseId, Graded)
            const sql = `
            INSERT INTO Tasks 
            VALUES (?, ?, ?, ?, ?, ?);
            `;
            console.log(`Create new Task ${newId} for course ${courseId}`);
            await executeOnDB(db =>
            {
                const runner = db.prepare(sql);
                runner.run(
                    newId, title, description, date, courseId, graded |0 // graded wird so in einen Int umgewandelt
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

module.exports = createTask;
