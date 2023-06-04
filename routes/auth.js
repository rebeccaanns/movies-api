const router = require('express').Router();

//login with google
router.get('/google', (req, res) => {
  //passport eventually
  res.send('logging in with Google')
});
