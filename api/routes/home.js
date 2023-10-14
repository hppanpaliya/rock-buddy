const express = require("express");
const router = express.Router();
const redis = require('redis');
if(process.env.REDISCLOUD_URL){
	client = redis.createClient({
		password: process.env.REDISCLOUD_PASSWORD,
		socket: {
			host: process.env.REDISCLOUD_URL,
			port: process.env.REDISCLOUD_PORT
		}
	})
}
else{
  client = redis.createClient();
}
client.connect().then(() => {});

router.route("/")
    .get(async (request, response) => {
        response.status(200).json("Homepage.")
    });

module.exports = router