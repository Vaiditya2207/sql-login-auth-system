const { db } = require('../db/db');
const signup = (user) => {
    const query = `INSERT INTO users (username, name, email, password) VALUES ('${user.username}', '${user.name}', '${user.email}', '${user.password}')`;
    return new Promise((resolve, reject) => {
        db.query(query, (err, result) => {
            if(err) {
                reject(err);
            }
            resolve(true);
        });
    });
}

module.exports = signup;