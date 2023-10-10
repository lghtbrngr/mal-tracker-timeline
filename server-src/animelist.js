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
  const response = await fetch(url, options);
  const result = await response.json();
  res.send(result);
};
