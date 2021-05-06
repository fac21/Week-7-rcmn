const express = require("express");
const home = require('./routes/home');
const login = require('./routes/login');
const logout = require('./routes/logout');
const signUp = require('./routes/signup');
const photos = require("./routes/photos");


const server = express();
const PORT = process.env.PORT || 3000;
const staticHandler = express.static("public");
server.use(staticHandler);

const upload = require("multer")
const multer = upload();
const cookieParser = require("cookie-parser");
const bodyParser = express.urlencoded({ extended: false });



server.use(cookieParser(process.env.COOKIE_SECRET));
server.use(bodyParser);


server.get("/sign-up", signUp.get)
server.post("/sign-up", signUp.post)
server.get("/", home.get);

server.get("/log-in", login.get);
server.post("/log-in", login.post);

server.post("/log-out", logout.post);

// server.get("/photos", photos.get)
server.post("/photos",multer.single("photo"),  photos.post)

server.listen(PORT, () => console.log(`started on http://localhost:${PORT}`));
