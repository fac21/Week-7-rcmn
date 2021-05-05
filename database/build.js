const fs = require("fs")
const path = require("path")
const db = require("./connection.js")

const initpath = path.join(__dirname, 'init.sql')
const initSQL = fs.readFileSync(initpath, "utf-8")

function build() {
    return db.query(initSQL)
}

module.exports = build