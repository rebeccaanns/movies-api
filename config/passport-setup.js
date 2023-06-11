const passport = require('passport');
const Google = require('passport-google-oauth20');
const User = require('../models/userRating');

const dotenv = require('dotenv');
dotenv.config();


passport.use(new Google({
  //options
  clientID: process.env.CLIENTID,
  clientSecret: process.env.CLIENTSECRET
}), (accessToken, refreshToken, profile, done) => {
  //passport callback function
  console.log('passportt callback function fired');
  console.log(profile);
})
