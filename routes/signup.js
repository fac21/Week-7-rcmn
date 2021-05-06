const bcrypt = require("bcryptjs");
const template = require("../template");
const db = require('../database/connection');
const auth = require('../auth');


function get (request, response){
const signUpForm = `
  <h2>Sign Up</h2>
  <form action="/sign-up" method="POST" class = 'center stack-sm'>
  <label for="email">
    Email
  <span aria-hidden="true">*</span>
  </label> 
  <input type="email" name="email" id="email" required>

  <label for="name">
    Name
  <span aria-hidden="true">*</span>
  </label>
  <input type="text" name="name" id="name" required>

  <label for="password">
    Password
  <span aria-hidden="true">*</span>
  </label>
  <div id="passwordRequirements" class="requirements">
      Passwords must contain at least one number.
  </div>
  <input 
    type="password" 
    name="password" 
    id="password" 
    aria-describedby="passwordRequirements passwordError"
    minlength='1' />
  <button type="submit">Sign up</button>
  </form>
  `
  response.send(template("TRAVELOG", signUpForm));
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