const express = require('express');

const app = express.Router();

const controller = require('../controllers/movies');

app.get('/:title', controller.getMovies);

module.exports = app;
