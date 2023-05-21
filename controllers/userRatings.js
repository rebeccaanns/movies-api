const db = require('../models');
const userRatings = db.userRatings;

exports.create = (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      message: "Conent cannot be empty"
    });
    return;
  }

  const rating = new userRatings(req.body);
  rating
    .save()
    .then((data) => {
      console.log(data);
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occured while creating the rating."
      });
    });
};

exports.getAll = (req, res) => {
  userRatings.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occured while retrieving ratings"
      });
    });
}

exports.getOne = (req, res) => {
  const username = req.params.username;
  userRatings.find({
      username: username
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while rerieving rating"
      });
    });
};
