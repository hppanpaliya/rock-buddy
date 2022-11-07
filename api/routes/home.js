const express = require("express");
const router = express.Router();
const redis = require('redis');
const client = redis.createClient();
client.connect().then(() => {});

router.route("/")
    .get(async (request, response) => {
        response.status(200).json("Homepage.")
    });

module.exports = router