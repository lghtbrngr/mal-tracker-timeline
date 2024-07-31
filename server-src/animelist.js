const fetch = require('node-fetch');
const { urlEncode } = require('./util');

const malUsername = process.env.MAL_USERNAME;
const malClientId = process.env.MAL_CLIENT_ID;
const malAccessToken = process.env.ACCESS_TOKEN;

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

async function putMyListStatus(animeId, payload) {
  const url = `https://api.myanimelist.net/v2/anime/${animeId}/my_list_status`;
  return await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${malAccessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: urlEncode(payload),
  });
}

async function updateMyListStatus(req, res, payload) {
  if (!malAccessToken) {
    const message = 'Missing mal access token. Authenticate first.';
    console.error(message);
    res.status(404).send(message);
  }
  const response = await putMyListStatus(req.body.animeId, payload);
  const json = await response.json();
  res.status(response.status).send(json);
}

exports.increment = async (req, res) => {
  updateMyListStatus(req, res, {
    num_watched_episodes: req.body.episodesWatched,
  });
};

exports.updateStatus = async (req, res) => {
  updateMyListStatus(req, res, {
    status: req.body.status,
  });
};

exports.updateStatusBulk = async (req, res) => {
  if (!malAccessToken) {
    const message = 'Missing mal access token. Authenticate first.';
    console.error(message);
    res.status(404).send(message);
  }
  const results = req.body.animeIds.map(async animeId => (
    await putMyListStatus(animeId, { // TODO: rate limit
      status: req.body.status,
    })
  )).map(async response => [response.status, await response.json()]);
  res.send(results);
};
