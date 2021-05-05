const express = require("express");
const home = require('./routes/home');

const server = express();

const staticHandler = express.static("public");
server.use(staticHandler);

// const cookieParser = require("cookie-parser");
const bodyParser = express.urlencoded();

// server.use(cookieParser(process.env.COOKIE_SECRET));

server.get("/", home.get);





const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`started on http://localhost:${PORT}`));
