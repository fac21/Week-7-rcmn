const template = require('../template');
const model = require('../database/model');

function get(request, response) {
  const sid = request.signedCookies.sid;
  if(!sid) {
  const loggedOutHtml = `
      <h1><img class='logo' src='logo.png' alt="logo"></h1>
        <a href="/sign-up">Sign up</a>
        <span> | </span>
        <a href="/log-in">Log in</a>
      `;
      response.send(template('travelog', loggedOutHtml))
  } else {
    model.getUserSessionData(sid).then((session) => {
      const loggedInHtml = `
        <h1>Hello ${session.data.user.name}!</h1>
        <form action="/log-out" method="POST">
          <button>Log out</button>
        </form>
        <a href='/posts'>Go to posts</a>
      `;
      response.send(template('travelog', loggedInHtml))
    })

  }
}

module.exports = { get }