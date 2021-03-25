'use strict';

// require statements
require('dotenv').config();
const express = require('express');
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
  const { lat, lon } = request.query;

  const url = 'http://api.weatherbit.io/v2.0/forecast/daily';
  const query = {
    key: process.env.WEATHER_API_KEY,
    lat: lat,
    lon: lon,
    days: 7
  };

  superagent
    .get(url)
    .query(query)
    .then(superagentResults => {
      const results = superagentResults.body.data;
      const forecastArray = results.map(day => new Forecast (day));
      response.status(200).send(forecastArray);
    })
    .catch(error => {
      console.log(error);
      response.status(404).send('page not found');
    });
}
// constructor function for a Forecast - date and description
function Forecast(obj) {
  this.description = obj.weather.description;
  this.date = obj.datetime;
}

// api movie endpoint
app.get('/movies', getMovies);

function getMovies (request, response){
  console.log('in movies:', request.query);
  const locationSearch = request.query.city;
  const url = 'https://api.themoviedb.org/3/search/movie';
  const query = {
    query: locationSearch,
    api_key: process.env.MOVIE_API_KEY
  };

  superagent
    .get(url)
    .query(query)
    .then(superagentResults => {
      const movieResults = superagentResults.body.results;
      // console.log(superagentResults.body);
      const movieArray = movieResults.map(movie => new Movie (movie));
      console.log(movieArray);
      response.status(200).send(movieArray);
    })
    .catch(error => {
      console.log(error);
      response.status(404).send('page not found');
    });
}

// constructor function for a movie - title, overview, image_url, average_votes, total_votes, popularity, realeased_on
function Movie(obj) {
  this.title = obj.title;
  this.overview = obj.overview;
  this.imageUrl = obj.poster_path;
  this.avgVotes = obj.vote_average;
  this.totalVotes = obj.vote_count;
  this.popularity = obj.popularity;
  this.releasedOn = obj.release_date;
}
// // function to handle error from any API call
app.get('*', (request, response) => {
  response.status(500).send('Internal Server Error');
});
// turns on the server
app.listen(PORT, () => console.log(`listening on ${PORT}`));
