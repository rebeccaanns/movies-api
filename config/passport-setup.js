const passport = require('passport');
const Google = require('passport-google-oauth20');

const dotenv = require('dotenv');
dotenv.config();


passport.use(new Google({
  //options
  clientID: process.env.CLIENTID,
  clientSecret: process.env.CLIENTSECRET
}), () => {
  //passport callback
})
