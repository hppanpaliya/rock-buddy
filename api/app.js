//Express and redis
const express = require('express');
const app = express();
const redis = require('redis');
const client = redis.createClient();
client.connect().then(() => {});

//Routing 
const configRoutes = require('./routes');
const middlewareWrapper = require('./middleware')

//middleware wrapper function for app-level middleware (express, redis, etc.)
middlewareWrapper(app)

//Routing middleware wrapper function
configRoutes(app);

//Server start
app.listen(4000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:4000');
});