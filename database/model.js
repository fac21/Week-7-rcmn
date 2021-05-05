const db = require("./connection");

function getUser(email) {
    const selectUser = `SELECT id, email, password, name FROM users WHERE email = $1`
    return db.query(selectUser, [email])
    .then((result) => result.rows[0]);
}

module.exports = { getUser };

function createSession() {
    const insertSession = `INSERT INTO sessions (sid, data) VALUES ($1, $2) RETURNING sid`;
    return db
            .query(insertSession, [sid, dataObject])
            .then((result) => console.log(result.rows[0].sid))
           // .then((result) => result.rows[0].sid);

}