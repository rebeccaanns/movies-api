const express = require('express');
const ratings = require('./userRating');
const app = express.Router();

//login with google
// app.get('/google', (req, res) => {
//   //passport eventually
//   res.send('logging in with Google')
// });

const {
  auth
} = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0SECRET,
  baseURL: 'http://localhost:3000',
  clientID: 'ebLmKAOmIjTCxjGZ2Fpu9xQ3JEey2WNZ',
  issuerBaseURL: 'https://dev-8hq21cpj6xz1v6v1.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

module.exports = app;
