'use strict';

const superagent = require('superagent');

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

module.exports = getWeather;
