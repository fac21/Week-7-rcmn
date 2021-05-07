const model = require("../database/model.js");

function get(req, res) {
  const photoId = req.params.photoid;
    console.log(photoId);
    model.getPhoto(photoId).then((photo) => {
        res.send(photo.photo);
    }).catch((error) => {
        console.error(error);
    })
}


module.exports = { get }