const {
  response
} = require('express');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const db = require('../models');
const Movies = db.movies;

//get all
const getMovies = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db('movies').collection('movies').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

//GET single movie
const singleMovie = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('movies')
      .collection('movies')
      .find({
        _id: userId
      });

    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

//POST - create new movie
const postMovie = async (req, res) => {
  try {
    const movie = {
      title: req.body.title,
      director: req.body.director,
      stars: req.body.stars,
      releaseDate: req.body.releaseDate,
      genre: req.body.genre,
      rating: req.body.rating,
      animated: req.body.animated,
      audienceScore: req.body.audienceScore
    };

    const result = await mongodb
      .getDb()
      .db('movies')
      .collection('movies')
      .insertOne(movie);

    if (result.acknowledged) {
      res.status(201).json(result);
    } else {
      res.status(500).json(result.error || "An error occured while attempting to create the movie")
    }
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
}

//PUT - update a movie
const putMovie = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);

    const movie = {
      title: req.body.title,
      director: req.body.director,
      stars: req.body.stars,
      releaseDate: req.body.releaseDate,
      genre: req.body.genre,
      rating: req.body.rating,
      animated: req.body.animated,
      audienceScore: req.body.audienceScore
    };

    const result = await mongodb
      .getDb()
      .db('movies')
      .collection('movies')
      .replaceOne({
        _id: userId
      }, movie);

    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(result.error || "An error occured while attempting to update the movie")
    }
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
}

//DELETE movie
const deleteMovie = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('movies')
      .collection('movies')
      .deleteOne({
        _id: userId
      }, true);

    if (result.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(result.error || "An error occured while attempting to delete the movie")
    }
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

module.exports = {
  singleMovie,
  getMovies,
  putMovie,
  deleteMovie,
  postMovie
};
