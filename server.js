const express = require("express");

const server = express();
const PORT = process.env.PORT || 3000;
const staticHandler = express.static("public");
server.use(staticHandler);

const cookieParser = require("cookie-parser");
const bodyParser = express.urlencoded({ extended: false });

const signUp = require('./routes/signup')

server.use(cookieParser(process.env.COOKIE_SECRET));
server.use(bodyParser)


server.get("/signup", signUp.get)
server.post("/signup", signUp.post)


server.listen(PORT, () => console.log(`started on http://localhost:${PORT}`));
