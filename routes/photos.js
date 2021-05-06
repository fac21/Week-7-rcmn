const express = require("express");
const multer = require("multer");
const model = require("../database/model.js");

const server = express();

// note <form> uses enctype="multipart/form-data"
// this is required for file uploads

function get(req, res) {
  model.getPhoto()
  .then((photos) => {
    const photosArr = Object.keys(photos);
    res.send(`
      <h2>Gallery</h2>
      <form enctype="multipart/form-data" method="post">
        <p>
          <label for="photo">Upload your photo</label>
          <input type="file" id="photo" name="photo">
        </p>
        <p>
          <label for="title">Caption your photo</label>
          <input type="text" id="title" name="title">
        </p>
        <p>
          <label for="tag">Tag</label>
          <select name="tag" id="tag">
            <option value="nature">Nature</option>
            <option value="city">City</option>
            <option value="seaside">Seaside</option>
            <option value="park">Park</option>
            <option value="other">Other</option>
          </select>
        </p>
        <p><button>Upload</button></p>
      </form>

      <ul>

        ${photosArr.map(photos => `
          <li>
            <h2>${photos.title}</h2>
            <img src="/photos/${photos.photo}/photo" alt="" width="64" height="64">
          </li>
        `).join("")}
     </ul>
    `)
  })
}


// multer parses form bodies encoded with "multipart/form-data"
// this is necessary to allow file uploads
// https://github.com/expressjs/multer

// const upload = multer();

// // we have to set the multer middleware for each route with a multipart form
// // we tell it the same of the file input field to expect (e.g. "avatar")
// // then it makes the file available at `req.file`

// const MAX_SIZE = 1000 * 1000 * 5; // 5 megabytes
// const ALLOWED_TYPES = ["image/jpeg", "image/png"]; // probs want to support more formats than this

// server.post("/", upload.single("avatar"), (req, res) => {
//   const file = req.file;
  
//   // file.mimetype tells us what kind of file it was
//   if (!ALLOWED_TYPES.includes(file.mimetype)) {
//     res.status(400).send("<h1>File upload error</h1><p>Please upload an image file</p>");
//   }
//   // file.size tells us how big the file was (in bytes)
//   if (file.size > MAX_SIZE) {
//     res.status(400).send("<h1>File upload error</h1><p>Profile picture must be < 5MB</p>");
//   } else {
//     const { email, name } = req.body;
    
//     // file.buffer contains the actual raw file contents we want
//     model.createUser(email, name, file.buffer);
//     res.redirect("/");
//   }
// });

// // e.g. request from an img tag
// // <img src="/user/3/avatar">
// server.get("/user/:id/avatar", (req, res) => {
//   model.getAvatar(req.params.id).then(user => {
//     res.send(user.avatar);
//   })
// })

// const PORT = process.env.PORT;

// server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

module.exports = { get }