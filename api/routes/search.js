const express = require("express");
const router = express.Router();
const redis = require('redis');
const client = redis.createClient();
client.connect().then(() => {});

const helper = require('../helper')
const {validateSearchTerm} = helper.validations

//search functions
const data = require('../data')
const {searchArtists, searchAlbums, searchTracks} = data.search;

router.route("/artists")
    .get(async (request, response) =>{
        try {
            //1. validate 
            let term = validateSearchTerm(request.body)

            //2. query
            let data = await searchArtists(term)

            //3. check if no results
            if(data.items.length === 0){
                return response.status(404).json({error: `No artists found with search term ${term}`})
            }

            response.status(200).json(data)
            return
    
            
        } catch (error) {
            response.status(400).json(error)
            return
        }
        ;

});

router.route("/albums")
    .get(async (request, response) =>{
        try {

            //1. validate term
            let term = validateSearchTerm(request.body);

            //2. query api
            let data = await searchAlbums(term)
           
            //3. check if no results
            if(data.items.length === 0){
                return response.status(404).json({error: `No albums found for search term ${term}`})
            }

            response.status(200).json(data)
            return
            
        } catch (error) {
            response.status(400).json(error)
            return
        }
        ;

});

router.route("/songs")
    .get(async (request, response) =>{
        try {

            //1. validate term
            let term = validateSearchTerm(request.body);

            //2. query api
            let data = await searchTracks(term)
           
            //3. check if no results
            if(data.items.length === 0){
                return response.status(404).json({error: `No songs found for search term ${term}`})
            }

            response.status(200).json(data)
            return
            
        } catch (error) {
            response.status(400).json(error)
            return
        }
        ;

});

module.exports = router;