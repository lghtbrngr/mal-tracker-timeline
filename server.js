require('dotenv').config();
const express = require('express');
const animelist = require('./server-src/animelist');

const app = express();

app.get('/api/animelist', animelist.retrieve);

app.listen(3001, () => {
  console.log('Server running');
});
