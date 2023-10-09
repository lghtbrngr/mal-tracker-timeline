const express = require('express');
const app = express();

app.get('/api', (req, res) => {
  res.send("Hello api");
});

app.listen(3001, () => {
  console.log("Server running");
});
