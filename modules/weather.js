'use strict';


const superagent = require('superagent');
let cache = require('./cache.js');

function getWeather(latitude, longitude) {
  const key = 'weather-' + latitude + longitude;
  const url = 'http://api.weatherbit.io/v2.0/forecast/daily';
  const queryParams = {
    key: process.env.WEATHER_API_KEY,
    lang: 'en',
    lat: latitude,
    lon: longitude,
    days: 7,
  };

  if (cache[key] && (Date.now() - cache[key].timestamp < 1.08e+7)) {
    console.log('Cache hit', cache[key].data);
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = superagent
      .get(url)
      .query(queryParams)
      .then(response => parseWeather(response.body));
  }

  return cache[key].data;
}

function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.data.map(day => {
      return new Weather(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Weather {
  constructor(day) {
    this.forecast = day.weather.description;
    this.time = day.datetime;
  }
}

module.exports = getWeather;
