const db = require('../models');
const userRatings = db.userRatings;
const {
  response
} = require('express');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//username and password
// const create = (req, res) => {
//   if (!req.body.username || !req.body.password) {
//     res.status(400).send({
//       message: "Conent cannot be empty"
//     });
//     return;
//   }

const postRating = async (req, res) => {
  try {
    const rating = {
      username: req.body.username,
      password: req.body.password,
      seen: req.body.seen,
      liked: req.body.liked,
      personalRating: req.body.personalRating
    };

    const result = await mongodb
      .getDb()
      .db('userRating')
      .collection('movies')
      .insertOne(rating);

    if (result.acknowledged) {
      res.status(201).json(result);
    } else {
      res.status(500).json(result.error || "An error occured while attempting to create the rating")
    }
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
}

//get All
const getRatings = async (req, res, next) => {
  try {
    const result = await mongodb.getDb('userRating').db().collection('movies').find();
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

//GET single rating
const singleRating = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('userRating')
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

//PUT - update a rating
const putRating = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);

    const rating = {
      username: req.body.username,
      password: req.body.password,
      seen: req.body.seen,
      liked: req.body.liked,
      personalRating: req.body.personalRating
    };

    const result = await mongodb
      .getDb()
      .db('userRating')
      .collection('movies')
      .replaceOne({
        _id: userId
      }, rating);

    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(result.error || "An error occured while attempting to update the rating")
    }
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
}

//DELETE ratinig
const deleteRating = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('userRating')
      .collection('movies')
      .deleteOne({
        _id: userId
      }, true);

    if (result.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(result.error || "An error occured while attempting to delete the rating")
    }
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};


module.exports = {
  // create,
  getRatings,
  singleRating,
  postRating,
  putRating,
  deleteRating
};
