require('dotenv').config();
const express = require('express');
const animelist = require('./server-src/animelist');
const malOauth = require('./server-src/malOauth');

const app = express();

app.use(express.json());

app.get('/api/animelist', animelist.retrieve);
app.put('/api/incrementAnime', animelist.increment);
app.put('/api/updateAnimeStatus', animelist.updateStatus);
app.put('/api/updateAnimeStatusBulk', animelist.updateStatusBulk);
app.get('/api/authUrl', malOauth.generateAuthUrl);
app.post('/api/completeMalAuth', malOauth.completeMalAuth);

app.listen(3001, () => {
  console.log('Server running');
});
