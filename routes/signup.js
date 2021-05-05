const bcrypt = require("bcryptjs");
const template = require("../template");
const db = require('../database/connection');
const auth = require('../auth');


function get (request, response){
const signUpForm = `
<h1>Sign Up</h1>
<form action="/sign-up" method="POST">
<label for="email">Email</label> 
<input type="email" name="email" id="email" required>

<label for="name">Name</label>
<input type="text" name="name" id="name" required>

<label for="password">Password</label>
<input type="password" name="password" id="password" required>
<button type="submit">Sign up</button>
</form>
`
response.send(template("", signUpForm));
} 


function post(request, response) {
    const { name, email, password } = request.body;
    auth
    .createUser(email, password, name)
    .then((user) => auth.saveUserSession(user))
    .then((sid) => {
      response.cookie("sid", sid, auth.COOKIE_OPTIONS);
      response.redirect("/")
    })
    .catch((error) => {
      console.error(error);
      response.send(`<h1>Something went wrong</h1>`);
    })
  }


module.exports = { get, post}