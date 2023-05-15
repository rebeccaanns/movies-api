// const dotenv = require("dotenv");
// dotenv.config();

const express = require('express');
// const mongodb = require('./db/connect')

const app = express();
const port = process.env.port || 3000;

// mongodb.initDb((error, mongodb) => {
//     if (error) {
//       console.log(error);
//     } else {
//       app.listen(port);
//       console.log('Web Server is listening at port ' + port);
//     }
//   });
