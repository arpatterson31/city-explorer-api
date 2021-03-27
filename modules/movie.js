'use strict';

const superagent = require('superagent');
let cache = require('./cache.js');

function getMovies (request, response){
  // console.log('in movies:', request.query);
  const movie = request.query.city;

  if(cache[movie] !== undefined && cache[movie].createdAt > Date.now() - 300000){
    response.status(200).send(cache[movie]);
  } else{
    const url = 'https://api.themoviedb.org/3/search/movie';
    const query = {
      query: movie,
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
        // console.log(movieArray);
        cache[movie] = movieArray;
        response.status(200).send(movieArray);
      })
      .catch(error => {
        console.log(error);
        response.status(404).send('page not found');
      });
  }
}


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

module.exports = getMovies;
