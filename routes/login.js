const template = require("../template");
const auth = require("../auth");

function get(request, response) {
    const loginForm = `
    <h2>Log in</h2>
    <form action="log-in" method="POST" class = 'center stack-sm'>
      <label for="email">Email<span aria-hidden="true">*</span></label>
      <input type="email" id="email" name="email" required>

      <label for="name">Name <span aria-hidden="true">*</span></label>
      <input type="type" id="name" name="name" required>

      <label for="password">Password <span aria-hidden="true">*</span></label>
      <input type="password" id="password" name="password"
      aria-describedby="passwordRequirements passwordError"
        required
        minlength="1">

      <button type="submit">Log in</button>
    </form>
    `
    response.send(template("TRAVELOG", loginForm));
}

function post(request, response) {
    const { email, password } = request.body;
    auth
        .verifyUser(email, password) //verifying the user
        .then(auth.saveUserSession) //creating a random session id
        .then((sid) => {
            response.cookie("sid", sid, auth.COOKIE_OPTIONS);
            response.redirect("/photos");
        })
        .catch((error) => { //this catches any error that happens anytime in the promise
            console.error(error);
            response.send(`<h1>We couldn't find an account with that email address!</h1>
            <p>Please sign up <a href="/sign-up">here</a>`);
        });
    }


module.exports = { get, post };