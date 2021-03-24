'use strict';

// require statements
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const superagent = require('superagent');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// app.get('/', function (request, response) {
//   response.send('Hey girl, hey!');
// });

// const weather = require('./data/weather.json');


// const weatherArray = weather.data;
// api endpoint that process at a get request for lat and lon
app.get('/weather', getWeather);


function getWeather (request, response){
  const city = request.query.city;
  // const lon = request.query.lon;

  const url = 'http://api.weatherbit.io/v2.0/forecast/daily';
  const query = {
    city,
    key: process.env.WEATHER_API_KEY
  };

  superagent
    .get(url)
    .query(query)
    .then(results => {
      // const latitude = weather.lat;
      // const longitude = weather.lon;
      // const city = weather.city_name;
      console.log(results.body);
      const forecastArray = results.body.map(data => {
        return new Forecast(data);
      });
      response.status.send(forecastArray);
    })
    .catch(error => {
      console.log(error);
      response.status(404).send('page not found');
    });
}



// constructor function for a Forecast - date and description
class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}


// // function to handle error from any API call
// app.get('*', (request, response) => {
//   response.status(500).send('Internal Server Error');
// });
// turns on the server
app.listen(PORT, () => console.log(`listening on ${PORT}`));