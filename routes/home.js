const template = require('../template')

function get(request, response) {
  const loggedOutHtml = `
      <h1><img class='logo' src='logo.png' alt="logo"></h1>
        <a href="/sign-up">Sign up</a>
        <span> | </span>
        <a href="/log-in">Log in</a>
      `;
      response.send(template('travelog', loggedOutHtml))
}

module.exports = { get }