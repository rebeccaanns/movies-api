const {
  response
} = require('express');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const db = require('../models');
const Movies = db.movies;

exports.getMovies = (req, res) => {
  const movieName = req.params.themeName;
  Movies.find({
      themeName: themeName
    })
    .then((data) => {
      if (!data) res.status(404).send({
        message: 'Cannot find movie with name: ' + movieName
      });
      else res.send(data[0]);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error rerrieving movie with movieName=' + movieName,
        error: err
      });
    });
};
