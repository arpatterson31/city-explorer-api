'use strict';

// libraries
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const weatherHandler = require('./modules/weather');
const getMovies = require('./modules/movie');

// routes
app.get('/weather', weatherHandler);
app.get('/movies', getMovies);

app.get('*', (request, response) => {
  response.status(500).send('Internal Server Error');
});

// turns on the server
app.listen(PORT, () => console.log(`listening on ${PORT}`));
