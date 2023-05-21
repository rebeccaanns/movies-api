const express = require('express');
const app = express.Router();

app
  .use('/', require('./swagger'))
  .use('/movies', require('./movies'))
  .use('./userRating', require('./userRating'));

module.exports = app;
