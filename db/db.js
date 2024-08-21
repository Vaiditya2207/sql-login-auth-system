const mysql = require('mysql2');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'vaiditya@2501',
    database: 'sqlLoginAuthSystem',
    port: 3306
}

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
    if(err) {
        console.log('Error connecting to database');
        return;
    }
    console.log('Connected to database');
});


const checkUser = async (username, email) => {
    const query = `SELECT * FROM users WHERE username = '${username}' OR email = '${email}'`;
    return new Promise((resolve, reject) => {
        db.query(query, (err, result) => {
            if(err) {
                reject(err);
            }
            if(result.length === 0) {
                resolve(false);
            }
            else {
                resolve(true);
            }
        });
    })
};


module.exports = { db, checkUser };