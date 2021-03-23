'use strict';

// require statements
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const weatherData = require('./data/weather.json');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/', function (request, response) {
  response.send('Hey girl, hey!');
});

// api endpoint that process at a get request for lat and lon
app.get('/weather', (request, response) => {
  response.send('add something here')
});

// constructor function for a Forecast - date and description
class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}


// function to handle error from any API call
app.get('*', (request, response) => {
  response.status(500).send('Internal Server Error');
});

// turns on the server
app.listen(PORT, () => console.log(`listening on ${PORT}`));