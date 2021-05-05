const db = require("./connection");

function getUser(email) {
    const selectUser = `SELECT id, email, password, name FROM users WHERE email = $1`
    return db.query(selectUser, [email])
    .then((result) => result.rows[0]);
}

function createSession() {
    const insertSession = `INSERT INTO sessions (sid, data) VALUES ($1, $2) RETURNING sid`;
    return db
            .query(insertSession, [sid, dataObject])
            // .then((result) => console.log(result.rows[0].sid))
           .then((result) => result.rows[0].sid);
}

function deleteSession(sid) {
    const DELETE_SESSION = `DELETE FROM sessions WHERE sid = $1`;
    return db.query(DELETE_SESSION, [sid])
}

function getUserSessionData(sid) {
    const SELECT_SESSION_DATA = `
        SELECT data FROM sessions WHERE sid = $1
    `;
  return db.query(SELECT_SESSION_DATA, [sid]).then((result) => result.rows[0]);
}

module.exports = { getUser, createSession, deleteSession, getUserSessionData };