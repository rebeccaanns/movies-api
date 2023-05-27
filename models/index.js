const dbConnect = require('../db/connect.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConnect.url;
db.movie = require('./movies.js')(mongoose);
db.userRating = require('./userRating.js')(mongoose);

module.exports = db;
