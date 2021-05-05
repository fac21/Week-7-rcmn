const bcrypt = require("bcryptjs")

function get (request, response){
const html = `
<form action="/signup" method="POST">
<label for="email">Email</label> 
<input type="email" name="email" id="email" required>

<label for="name">Name</label>
<input type="text" name="name" id="name" required>

<label for="password">Password</label>
<input type="password" name="password" id="password" required>
<button type="submit">Sign up</button>
</form>
</body>
</html>
`
response.send(html)
} 

function hashPassword(password){

}



function post (request, response){
const data = request.body
hashPassword(data.password)
}

//data
//hash the pw
//insert data into users table return data
// pass in data and make a random sid 
//insert sid and data into sessions table
//set cookie with sid

module.exports = { get, post}