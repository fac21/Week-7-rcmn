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
      .getUserId(sid)
      .then((id) => model.getUserId(id))
      .then((userId) =>{
        model.addPhotoToDatabase(userId, title, tag, file.buffer)
        res.redirect("/photos")})
      .catch((error) => {
        //this catches any error that happens anytime in the promise
        console.error(error);
        res.send(`<h1>Oops try uploading again!</h1>`);
      });
  }
}





module.exports = { get, post }

