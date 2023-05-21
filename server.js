const dotenv = require("dotenv");
dotenv.config();

const express = require('express');
// const mongodb = require('./db/connect');

const app = express();
const port = process.env.port || 3000;

app
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

const db = require('./models');
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(port);
    console.log('DB connected and Web Server is listening at port ' + port);
  })
  .catch((err) => {
    console.log('Cannot connect to database', err);
    process.exit();
  });

// mongodb.initDb((error, mongodb) => {
//   if (error) {
//     console.log(error);
//   } else {
//     app.listen(port);
//     console.log('Web Server is listening at port ' + port);
//   }
// });
