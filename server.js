'use strict';

const express = require('express');

require('dotenv').config();

const weatherData = require('./data/weather.json');

const cors = require('cors');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3000;

app.get('/', function (request, response) {
  response.send('Hey girl, hey!');
});

// app.get('/weather', (request, response) => {
//   response.send('bananas are great')
// })

// // examples in class today
// app.get('/shopping', (request, response)=> {
//   response.send(shoppingList)
// })

// turns on the server
app.listen(PORT, () => console.log(`listening on ${PORT}`));