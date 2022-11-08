const express = require("express");
const router = express.Router();
const redis = require('redis');
const client = redis.createClient();
client.connect().then(() => {});

//search functions
const data = require('../data')
const {searchArtists, searchAlbums, searchTracks} = data.search;

router.route("/artists")
    .get(async (request, response) =>{
        try {
            let term = request.body.searchTerm
            let data = await searchArtists(term)
            console.log('here')
           
            response.status(200).json(data)
            return
            
        } catch (error) {
            response.status(404).json(error)
            return
        }
        ;

});

router.route("/albums")
    .get(async (request, response) =>{
        try {
            let term = request.body.searchTerm
            let data = await searchAlbums(term)
           
            response.status(200).json(data)
            return
            
        } catch (error) {
            response.status(404).json(error)
            return
        }
        ;

});

router.route("/songs")
    .get(async (request, response) =>{
        try {
            let term = request.body.searchTerm
            let data = await searchTracks(term)
           
            response.status(200).json(data)
            return
            
        } catch (error) {
            response.status(404).json(error)
            return
        }
        ;

});

module.exports = router;