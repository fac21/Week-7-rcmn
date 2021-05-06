const model = require("../database/model");
const MAX_SIZE = 1000 * 1000 * 5; // 5 megabytes
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/svg",
  "image/pdf",
  "image/gif",
];

function post(req, res) {
  const file = req.file;

  // file.mimetype tells us what kind of file it was
  if (!ALLOWED_TYPES.includes(file.mimetype)) {
    res
      .status(400)
      .send("<h1>File upload error</h1><p>Please upload an image file</p>");
  }
  // file.size tells us how big the file was (in bytes)
  if (file.size > MAX_SIZE) {
    res
      .status(400)
      .send("<h1>File upload error</h1><p>Profile picture must be < 5MB</p>");
  } else {
    const { title, tag } = req.body;

    // file.buffer contains the actual raw file contents we want
    // model.createUser(email, name, file.buffer);
    const sid = req.signedCookies.sid;
    model
      .getUserName(sid)
      .then((name) => model.getId(name))
      .then((userId) =>
        model.addPhotosToDatabase(userId, title, tag, file.buffer)
      )
      .then((res) => {
        res.redirect("/");
      })
      .catch((error) => {
        //this catches any error that happens anytime in the promise
        console.error(error);
        response.send(`<h1>Oops try uplading again!</h1>`);
      });
  }
}

module.exports = { post };
