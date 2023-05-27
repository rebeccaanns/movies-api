const express = require('express');
const app = express.Router();

const controller = require('../controllers/userRatings');

app.get('/', controller.getRatings);

app.get('/:id', controller.singleRating);

app.post('/', controller.postRating);

app.put('/:id', controller.putRating);

app.delete('/:id', controller.deleteRating);

module.exports = app;
