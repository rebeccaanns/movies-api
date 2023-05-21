const dbConnect = require('../db/connect');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConnect.url;
db.movie = require('./movies')(mongoose);
db.userRating = require('./userRating')(mongoose);

module.exports = db;
