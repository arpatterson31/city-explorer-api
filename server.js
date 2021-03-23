'use strict';

// require statements
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const weather = require('./data/weather.json');
const weatherArray = weather.data;


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/', function (request, response) {
  response.send('Hey girl, hey!');
});

// api endpoint that process at a get request for lat and lon
app.get('/weather', function(request, response){
  console.log(weather);
  const latitude = weather.lat;
  const longitude = weather.lon;
  const city = weather.city_name;
  const forecastArray = weatherArray.map(ele => {
    return new Forecast(ele.datetime, ele.weather.description);
  });

  const cityData = {
    latitude: latitude,
    longitude: longitude,
    city: city,
    forecastArray: forecastArray
  };

  response.send(cityData);
});

// // function to handle error from any API call
// app.get('*', (request, response) => {
//   response.status(500).send('Internal Server Error');
// });


// constructor function for a Forecast - date and description
class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}


// turns on the server
app.listen(PORT, () => console.log(`listening on ${PORT}`));