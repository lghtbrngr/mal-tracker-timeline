require('dotenv').config();
const express = require('express');
const path = require('path');
const animelist = require('./server-src/animelist');
const malOauth = require('./server-src/malOauth');

const app = express();

// Serve client
app.use(express.static(path.join(__dirname, 'build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Serve api
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
