const express = require("express");
const router = express.Router();
const redis = require('redis');
const client = redis.createClient();
client.connect().then(() => {});

const helper = require('../helper')
const {validateQueryParam, checkString} = helper.validations

//search functions
const data = require('../data')
const {searchArtists, searchAlbums, searchTracks} = data.search;

router.route("/artists")
    .get(async (request, response) =>{
        try {
            //1. validate 
            let term = checkString(request.query.term);

            let page
            if (request.query.page){
                page = validateQueryParam(request.query.page);
            }
            else{
                page = 0
            }

            //2. query
            let data = await searchArtists(term, page)

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

            //1. validate 
            let term = checkString(request.query.term);

            let page
            if (request.query.page){
                page = validateQueryParam(request.query.page);
            }
            else{
                page = 0
            }

            //2. query api
            let data = await searchAlbums(term, page)
           
            //3. check if no results
            console.log(data)
            if(data.next === null && data.previous === null && data.items.length === 0){
                return response.status(404).json({error: `No albums found for search term ${term}`})
            }
            data['album'] = true

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

            //1. validate 
            let term = checkString(request.query.term);

            let page
            if (request.query.page){
                page = validateQueryParam(request.query.page);
            }
            else{
                page = 0
            }

            //2. query api
            let data = await searchTracks(term, page)
           
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