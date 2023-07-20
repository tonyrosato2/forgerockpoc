const request = require('superagent');

const { AM_URL, CONFIDENTIAL_CLIENT, REALM_PATH } = require('./constants.js');

/**
 * @function auth - Auth middleware for checking the validity of user's auth
 * @param {Object} req - Node.js' req object
 * @param {Object} res - Node.js' res object
 * @param {function} next - Node.js' req next method to proceed through middleware
 * @return {void}
 */
async function auth(req, res, next) {
  let response;

  try {
    if (req.headers.authorization) {
      const [_, token] = req.headers.authorization.split(' ');

      console.log('Starting auth validation...');
      console.log('Token: ' + token);

      response = await request
        .post(`${AM_URL}/oauth2/realms/root/realms/${REALM_PATH}/introspect`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Basic ${CONFIDENTIAL_CLIENT}`)
        .query({ token });

      console.log('Response from auth server received.');
      console.log('Response body: ' + JSON.stringify(response.body));
    }
  } catch (err) {
    console.log('Auth validation error:');
    console.log(JSON.stringify(err));
    console.log(`Error: auth middleware: ${err}`);
    response = {
      body: {},
    };
  }

  if (response?.body?.active) {
    console.log('Auth validation succeeded.');
    req.user = response.body;
    next();
  } else {
    console.log('Auth validation failed.');
    console.log(JSON.stringify(response));
    res.status(401).send();
  }
}

module.exports = auth;
