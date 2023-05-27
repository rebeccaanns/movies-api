const express = require('express');

const app = express.Router();

const controller = require('../controllers/movies');

app.get('/', controller.getMovies);

app.get('/:id', controller.singleMovie);

app.post('/', controller.postMovie);

app.put('/:id', controller.putMovie);

app.delete('/:id', controller.deleteMovie);

module.exports = app;
