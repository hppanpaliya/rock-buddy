//Express and redis
require('dotenv').config();
const axios = require('axios')
const express = require('express');
const app = express();
const redis = require('redis');
const client = redis.createClient();
client.connect().then(() => {});

// Middleware for serving static files, such as images after they are
// processed by Image Magick
app.use(express.static('public'));

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
    
    console.log("Generating bearer token...")
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
    console.log("Successfully generated Spotify Bearer token.")
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

setInterval(async () => { //generates new token every 50 minutes
  let newToken = await generateToken()
  process.env.AUTH_TOKEN = newToken
  }, 3000000)

