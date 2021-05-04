const express = require("express");
const cookieParser = require("cookie-parser");

const server = express();

const staticHandler = express.static("public");
server.use(staticHandler);

const bodyParser = express.urlencoded();

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`started on http://localhost:${PORT}`));