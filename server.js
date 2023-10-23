require('dotenv').config();
const express = require('express');
const animelist = require('./server-src/animelist');
const malOauth = require('./server-src/malOauth');

const app = express();

app.get('/api/animelist', animelist.retrieve);
app.get('/api/authUrl', malOauth.generateAuthUrl);
app.get('/api/completeMalAuth', malOauth.completeMalAuth);

app.listen(3001, () => {
  console.log('Server running');
});
