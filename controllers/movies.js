const {
  response
} = require('express');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const db = require('../models');
const Movies = db.movies;

exports.getMovies
