const { randomBytes } = require('node:crypto');
const fetch = require('node-fetch');
const { urlEncode } = require('./util');

const BASE_AUTH_URL = 'https://myanimelist.net/v1/oauth2/authorize?response_type=code';
const TOKEN_URL = 'https://myanimelist.net/v1/oauth2/token';

const malClientId = process.env.MAL_CLIENT_ID;
const malClientSecret = process.env.MAL_CLIENT_SECRET;

// Quick hack for development usage: allow authorization of one single MAL account,
// static for the whole backend. Will need to fix this before deploying publicly,
// which will mean setting up a db with user accounts to link users to their
// oauth identities.
let challenge = null;

function generateChallenge() {
  // random string, up to 128 chars long, url-safe characters
  const r = randomBytes(63).toString('hex');
  return r.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

// Generate the link for the user to click on here in the backend, so that
// the backend can keep the challenge in state, since it will be needed later.
exports.generateAuthUrl = (req, res) => {
  let result = BASE_AUTH_URL;
  result = result.concat(`&client_id=${malClientId}`);

  challenge = generateChallenge();
  result = result.concat(`&code_challenge=${challenge}`);

  console.log(`auth url challenge: ${challenge}`);
  res.send(result);
};

// When the user clicks allow at the MAL url, MAL will redirect them
// to /oauth,
// which on load will call the /api/completeMalAuth api endpoint, which will
// be handled by the below method. The below method queries MAL again to get
// the user's access token and store it in the backend state (currently just
// in local memory).
exports.completeMalAuth = async (req, res) => {
  if (challenge === null) {
    console.warn('mal auth completion api called, but no challenge was in memory');
    res.status(500).end();
    return;
  }

  const params = {
    client_id: malClientId,
    client_secret: malClientSecret,
    code: req.body.authCode,
    code_verifier: challenge,
    grant_type: 'authorization_code',
  };

  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: urlEncode(params),
  });
  const json = await response.json();
  challenge = null;
  console.log('MAL access token response, to put in .env file manually:');
  console.log(json);

  res.end();
};
