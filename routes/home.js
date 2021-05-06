const template = require('../template');
const model = require('../database/model');

function get(request, response) {
  const sid = request.signedCookies.sid;
  if(!sid) {
  const loggedOutHtml = `
      <section class = 'flex-row'>
        <a href="/sign-up">Sign up</a>
        
        <a href="/log-in">Log in</a>
      </section>
      `;
      response.send(template("TRAVELOG", loggedOutHtml))
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