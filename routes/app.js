const express = require('express');
const movies = require('./movies');
const ratings = require('./userRating');
const auth = require('./auth');
const app = express.Router();

app
  .use('/movies', require('./movies'))
  .use('/userRating', require('./userRating'))
  .use('./auth', require('./auth'))
  .use('/', require('./swagger'));

module.exports = app;
