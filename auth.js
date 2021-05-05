const bcrypt = require("bcryptjs");
const model = require("./database/model");
const crypto = require("crypto")

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

function saveUserSession(user) {
    const randomSID = crypto.randomBytes(18).toString("base64");
    return model.createSession(randomSID, { user });
}

module.exports = { verifyUser, saveUserSession }