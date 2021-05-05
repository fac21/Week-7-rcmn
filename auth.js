const bcrypt = require("bcryptjs");
const model = require("./database/model");
const crypto = require("crypto")

  const COOKIE_OPTIONS = {
    httpOnly: true,
    maxAge: 600000,
    sameSite: "strict",
    signed: true,
  };


function saveUserSession(user) {
    const randomSID = crypto.randomBytes(18).toString("base64");
    return model.createSession(randomSID, { user });
}

function createUser(email, password, name) {
    return bcrypt
      .hash(password, 10)
      .then((hash) => model.createUser(email, hash, name));
  }

function verifyUser(email, password) {
  return model.getUser(email).then((user) => {
    return bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        throw new Error("Passwords don't match, please try again.");
      } else {
        delete user.password;
        return user;
      }
    });
  });
}

  module.exports = { verifyUser, createUser, saveUserSession, COOKIE_OPTIONS };
