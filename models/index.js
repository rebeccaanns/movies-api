const dbConnect = require('../db/connect');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db
  .mongoose = mongoose
  .url = dbConnect.url
  .movie = require('./movies')(mongoose)
  .userRating = require('./userRating')(mongoose);

module.exports = db;
