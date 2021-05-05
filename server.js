const express = require("express");
const home = require('./routes/home');
const login = require('./routes/login');
const logout = require('./routes/logout');
const signUp = require('./routes/signup');

const server = express();
const PORT = process.env.PORT || 3000;
const staticHandler = express.static("public");
server.use(staticHandler);


const cookieParser = require("cookie-parser");
const bodyParser = express.urlencoded({ extended: false });



server.use(cookieParser(process.env.COOKIE_SECRET));
server.use(bodyParser);


server.get("/signup", signUp.get)
server.post("/signup", signUp.post)
server.get("/", home.get);

server.get("/log-in", login.get);
server.post("/log-in", login.post);

server.post("/log-out", logout.post);

server.listen(PORT, () => console.log(`started on http://localhost:${PORT}`));
