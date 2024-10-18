const fetch = require('node-fetch');
const { urlEncode } = require('./util');
const { decrypt } = require('./cryptutil');

const malUsername = process.env.MAL_USERNAME;
const malClientId = process.env.MAL_CLIENT_ID;

async function retrieve(status) {
  const url = `https://api.myanimelist.net/v2/users/${malUsername}/animelist?
  status=${status}&fields=list_status,num_episodes&nsfw=true`;

  const options = {
    headers: {
      'X-MAL-CLIENT-ID': malClientId,
    },
  };
  let result = [];
  let nextUrl = url;
  while (nextUrl) {
    const response = await fetch(nextUrl, options);
    const json = await response.json();
    result = result.concat(json.data);
    nextUrl = json.paging.next;
  }
  console.log(result.length);
  return result;
}

exports.retrieve = async (req, res) => {
  res.send({
    watching: await retrieve('watching'),
    onHold: await retrieve('on_hold'),
  });
};

/* Parses the encrypted session cookie token or returns 401 unauthorized if it's missing */
function withMalAccessToken(req, res, cb) {
  if (req.cookies?.token) {
    const token = decrypt(req.cookies.token);
    cb(token);
  } else {
    const message = 'Missing session token. Authenticate first.';
    console.error(message);
    res.status(401).send(message);
  }
}

async function putMyListStatus(animeId, payload, token) {
  const url = `https://api.myanimelist.net/v2/anime/${animeId}/my_list_status`;
  console.log(url, JSON.stringify(payload));
  return await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: urlEncode(payload),
  });
}

async function updateMyListStatus(req, res, payload) {
  withMalAccessToken(req, res, async (token) => {
    const response = await putMyListStatus(req.body.animeId, payload, token);
    const json = await response.json();
    if (response.status === 401) {
      console.warn('401 unauthorized. Need to reauthenticate.');
    }
    res.status(response.status).send(json);
  });
}

exports.increment = async (req, res) => {
  console.log(`increment(${JSON.stringify(req.body)})`);
  updateMyListStatus(req, res, {
    num_watched_episodes: req.body.episodesWatched,
  });
};

exports.updateStatus = async (req, res) => {
  console.log(`updateStatus(${JSON.stringify(req.body)})`);
  updateMyListStatus(req, res, {
    status: req.body.newStatus,
  });
};

exports.updateStatusBulk = async (req, res) => {
  withMalAccessToken(req, res, async (token) => {
    const resultPromises = req.body.animeIds.map(async animeId => {
      const response = await putMyListStatus(animeId, { // TODO: rate limit
        status: req.body.status,
      }, token);
      return {
        status: response.status,
        json: response.ok && await response.json(),
      };
    });
    const results = await Promise.all(resultPromises);
    res.send(results);
  });
};
