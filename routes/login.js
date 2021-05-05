const template = require("../template");

function get(request, response) {
    const loginForm = `
    <h1>Log in</h1>
    <form action="log-in" method="POST">
      <label for="email">Email</label>
      <input type="email" id="email" name="email">
      <label for="name">Name</label>
      <input type="type" id="name" name="name">
      <label for="password">Password</label>
      <input type="password" id="password" name="password">
      <button type="submit">Log in</button>
    </form>
    `
    response.send(template("", loginForm));
}

module.exports = { get };