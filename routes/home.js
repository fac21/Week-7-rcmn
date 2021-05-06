const template = require('../template');
const model = require('../database/model');

function get(request, response) {
  const sid = request.signedCookies.sid;
  if(!sid) {
  const loggedOutHtml = `
      <h2><img class='logo' src='logo.png' alt="logo"></h2>
        <a href="/sign-up">Sign up</a>
        <span> | </span>
        <a href="/log-in">Log in</a>
      `;
      response.send(template('TRAVELOG', loggedOutHtml))
  } else {
    model.getUserSessionData(sid).then((session) => {
      const loggedInHtml = `
        <h2>Hello ${session.data.user.name}!</h2>
        <form action="/log-out" method="POST">
          <button>Log out</button>
        </form>
        <a href='/photos'>View photos</a>
      `;
      response.send(template('TRAVELOG', loggedInHtml))
    })

  }
}

module.exports = { get }