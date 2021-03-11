const executeOnDB = require("../core/execute");

const removeUsersFromCourse = (users, courseId) => {
    return new Promise(async (resolve, reject) => {
        const sql = `
        DELETE FROM IsIn
        WHERE CourseId = ? AND UserId = ?;
        `;

        await executeOnDB(db => {
            users.forEach(user => {
                db.run(sql, [courseId, user.userId], err => {
                    if (err) throw err;
                });
            });
        }, true);
        resolve();
    })
}

module.exports = removeUsersFromCourse;

