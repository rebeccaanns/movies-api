const dotenv = require("dotenv");
dotenv.config();

const express = require('express');
const mongodb = require('./db/connect');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
// const createError = require('http-errors');
const cors = require('cors');
const http = require('http');
const logger = require('morgan');
const path = require('path');
const {
  auth
} = require('express-openid-connect');
const session = require('express-session');
const {
  requiresAuth
} = require('express-openid-connect');
// const {
//   signupValidation,
//   loginValidation
// } = require('../movies-api/routes/validator');

const router = require('./routes/app');
const db = require('./models');
const movies = require("./models/movies");

const app = express();
const port = process.env.port || 3000;

// Require static assets from public folder
app.use(express.static(path.join(__dirname, 'public')));
// Set 'views' directory for any views being rendered res.render()
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0SECRET,
  baseURL: 'http://localhost:3000',
  clientID: 'ebLmKAOmIjTCxjGZ2Fpu9xQ3JEey2WNZ',
  issuerBaseURL: 'https://dev-8hq21cpj6xz1v6v1.us.auth0.com'
};

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

// app.use(express.static('views'));

app
  .use(bodyParser.json())
  // .use(bodyParser.urlencoded({extended: true}))
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  .use(cors())
  .use(auth(config))
  .use(function (req, res, next) {
    res.locals.user = req.oidc.user;
    next();
  })
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use('/', router);

// db.mongoose
//   .connect(db.url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => {
//     app.listen(port);
//     console.log('DB connected and Web Server is listening at port ' + port);
//   })
//   .catch((err) => {
//     console.log('Cannot connect to database', err);
//     process.exit();
//   });

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handlers
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: process.env.NODE_ENV !== 'production' ? err : {}
  });
});


mongodb.initDb((error, mongodb) => {
  if (error) {
    console.log(error);
  } else {
    app.listen(port);
    console.log('Web Server is listening at port ' + port);
  }
});
