
const db = require("./connection");

function getUser(email) {
    const selectUser = `SELECT id, email, password, name FROM users WHERE email = $1`
    return db.query(selectUser, [email])
    .then((result) => result.rows[0]);
}

function createSession(sid, data) {
    const INSERT_SESSION = `
      INSERT INTO sessions (sid, data) VALUES ($1, $2)
      RETURNING sid
    `;
    return db
      .query(INSERT_SESSION, [sid, data])
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


function createUser(email, hash, name) {
    const INSERT_USER = `
      INSERT INTO users (email, password, name) VALUES ($1, $2, $3)
      RETURNING id, email, name
    `;
    return db
      .query(INSERT_USER, [email, hash, name])
      .then((result) => result.rows[0]);
  }

  function getUserName(sid) {
    const SELECT_SESSION_DATA = `
        SELECT data FROM sessions WHERE sid = $1
    `;
  return db.query(SELECT_SESSION_DATA, [sid]).then((result) => result.rows[0].name);
  }

  function getId(name){
    return db.query(`SELECT ID FROM USERS WHERE NAME = $1 RETURNING ID`, [name]).then((result) => result.rows[0]);
  }


 
function addPhotoToDatabase (userId, title, tag, photo){
return db.query(`INSERT INTO PHOTOS (user_id, photo, title, tag,  created_at) VALUES ($1, $2, $3, $4) `, [[userID, title, tag, photo]])
}



module.exports = { createUser, getUser, createSession, deleteSession, getUserSessionData, getUserName,  addPhotoToDatabase, getId };

