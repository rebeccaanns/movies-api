const express = require('express');
const movies = require('./movies');
const ratings = require('./userRating');
const auth = require('./auth');
const {
  requiresAuth
} = require('express-openid-connect');
const app = express.Router();

//AUTH0 Sample code
app.get('/', function (req, res, next) {
  res.render('app', {
    title: 'Auth0 Webapp sample Nodejs',
    isAuthenticated: req.oidc.isAuthenticated()
  });
});

app.get('/profile', requiresAuth(), function (req, res, next) {
  res.render('profile', {
    userProfile: JSON.stringify(req.oidc.user, null, 2),
    title: 'Profile page'
  });
});

app
  .use('/movies', require('./movies'))
  .use('/userRating', require('./userRating'))
  .use('./auth', require('./auth'))
  .use('/', require('./swagger'));


module.exports = app;
