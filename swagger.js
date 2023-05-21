const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Movies API',
    description: 'Project 2 movies API for CSE341 at BYUI ',
  },
  host: 'localhost:3000',
  schemes: ['http', 'https'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/app.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
