const express = require('express');
const movies = require('./movies');
const ratings = require('./userRating');
const app = express.Router();

app
  .use('/movies', require('./movies'))
  .use('/userRating', require('./userRating'))
  .use('/', require('./swagger'));

module.exports = app;
