const fetch = require('node-fetch');

const malUsername = process.env.MAL_USERNAME;
const malClientId = process.env.MAL_CLIENT_ID;

const url = `https://api.myanimelist.net/v2/users/${malUsername}/animelist?
status=watching&fields=list_status`;

exports.retrieve = async (req, res) => {
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
