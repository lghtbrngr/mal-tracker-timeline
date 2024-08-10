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

function checkMalAccessToken(res) {
  if (!malAccessToken) {
    const message = 'Missing mal access token. Authenticate first.';
    console.error(message);
    res.status(404).send(message);
    return false;
  }
  return true;
}

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

async function updateMyListStatus(animeId, res, payload) {
  if (checkMalAccessToken(res)) {
    const response = await putMyListStatus(animeId, payload);
    const json = await response.json();
    res.status(response.status).send(json);
  }
}

exports.increment = async (req, res) => {
  updateMyListStatus(req, res, {
    num_watched_episodes: req.body.episodesWatched,
  });
};

exports.updateStatus = async (req, res) => {
  console.log(`updateStatus(${JSON.stringify(req.body)})`);
  updateMyListStatus(req.body.animeId, res, {
    status: req.body.newStatus,
  });
};

exports.updateStatusBulk = async (req, res) => {
  if (checkMalAccessToken(res)) {
    const resultPromises = req.body.animeIds.map(async animeId => {
      const response = await putMyListStatus(animeId, { // TODO: rate limit
        status: req.body.status,
      });
      return {
        status: response.status,
        json: response.ok && await response.json(),
      };
    });
    const results = await Promise.all(resultPromises);
    res.send(results);
  }
};
