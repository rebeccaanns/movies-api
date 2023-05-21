const express = require('express');
const app = express.Router();

const controller = require('../controllers/userRatings');

app.get('/', controller.getAll);

app.get('/:username', controller.getOne);

app.post('/', controller.create);

module.exports = app;
