const express = require('express');
const ratings = require('./userRating');
const app = express.Router();

//login with google
app.get('/google', (req, res) => {
  //passport eventually
  res.send('logging in with Google')
});
