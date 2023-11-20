const fetch = require('node-fetch');
const { urlEncode } = require('./util');

const malUsername = process.env.MAL_USERNAME;
const malClientId = process.env.MAL_CLIENT_ID;
const malAccessToken = process.env.ACCESS_TOKEN;

exports.retrieve = async (req, res) => {
  const url = `https://api.myanimelist.net/v2/users/${malUsername}/animelist?
  status=watching&fields=list_status`;

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
  res.send(result);
};

exports.increment = async (req, res) => {
  const url = `https://api.myanimelist.net/v2/anime/${req.body.animeId}/my_list_status`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${malAccessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: urlEncode({
      num_watched_episodes: req.body.episodesWatched,
    }),
  });
  const json = await response.json();
  res.status(response.status).send(json);

  // TODO: handle errors
  // if no auth token is found
};
