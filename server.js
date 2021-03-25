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

// api weather endpoint
app.get('/weather', getWeather);

function getWeather (request, response){
  const city = request.query.city;

  const url = 'http://api.weatherbit.io/v2.0/forecast/daily';
  const query = {
    city,
    key: process.env.WEATHER_API_KEY,
    days: 7
  };

  superagent
    .get(url)
    .query(query)
    .then(results => {

      const forecastArray = results.body.data.map(data => {
        // console.log(data);
        return new Forecast(data.datetime, data.weather.description);
      });
      // console.log(forecastArray);
      response.status(200).send(forecastArray);
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

// api movie endpoint
// app.get('/movie', getMovie);

// function getMovie (request, response){
  
//   const url = 'https://api.themoviedb.org/3/search/movie';
//   const query = {
//     city,
//     key: process.env.MOVIE_API_KEY
//   };

// // function to handle error from any API call
app.get('*', (request, response) => {
  response.status(500).send('Internal Server Error');
});
// turns on the server
app.listen(PORT, () => console.log(`listening on ${PORT}`));