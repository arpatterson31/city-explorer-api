'use strict';

// require statements
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const getWeather = require('./weather');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// api endpoint
app.get('/weather', getWeather);
app.get('/movies', getMovies);

function getMovies (request, response){
  console.log('in movies:', request.query);
  const locationSearch = request.query.city;
  const url = 'https://api.themoviedb.org/3/search/movie';
  const query = {
    query: locationSearch,
    api_key: process.env.MOVIE_API_KEY,
    include_adult: false
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
  this.movieID = obj.id;
  this.overview = obj.overview;
  this.imageUrl = `https://image.tmdb.org/t/p/w300/${obj.poster_path}`;
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
