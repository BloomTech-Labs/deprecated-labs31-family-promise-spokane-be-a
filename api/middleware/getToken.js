// Helper function in retrieving token from front-end to implement authRoutes (plan on removing after production)
const fetch = require('isomorphic-fetch');

const DOMAIN = process.env.OKTA_URL_ISSUER;
const CLIENT_ID = process.env.OKTA_CLIENT_ID;
const REDIRECT_URI = 'http://localhost:3000/implicit/callback'; // or your redirect_uri
const TEST_USERNAME = 'llama001@maildrop.cc';
const TEST_PASSWORD = 'Test001Test';
(async () => {
  // Make a call to the authn api to get a sessionToken
  const authnRes = await fetch(`${DOMAIN}/api/v1/authn`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: TEST_USERNAME,
      password: TEST_PASSWORD,
    }),
  });
  const trans = await authnRes;
  // Send the session token as a query param in a GET request to the authorize api
  const authorizeRes = await fetch(
    `${DOMAIN}/oauth2/default/v1/authorize?` +
      'response_type=token&' +
      'scope=openid&' +
      'state=TEST&' +
      'nonce=TEST&' +
      `client_id=${CLIENT_ID}&` +
      `redirect_uri=${REDIRECT_URI}&` +
      `sessionToken=${trans.sessionToken}`
  );
  // Parse access_token from url
})();
