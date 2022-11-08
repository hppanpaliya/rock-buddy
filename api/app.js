//Express and redis
require('dotenv').config();
const axios = require('axios')
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


async function generateToken(){
    var client_id = process.env.CLIENT_ID; 
    var client_secret = process.env.CLIENT_SECRET; 
   
    const data = await axios.request({
        url: "https://accounts.spotify.com/api/token",
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            "Authorization": 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
        },
        params: {
            grant_type: "client_credentials",
          }
    })
    return data.data.access_token
}

async function run(){
  let token = await generateToken()
  process.env.AUTH_TOKEN = token;

  //Server start
  app.listen(4000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:4000');
  });
}

run()


