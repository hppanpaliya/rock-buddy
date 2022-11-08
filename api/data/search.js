const axios = require('axios')
const SpotifyWebApi = require('spotify-web-api-node');
const helper = require('../helper')
const {validateSearchTerm} = helper.validations



async function searchArtists(searchTerm, offset=20){

    //1. validate 
    if(arguments.length < 1) throw "Invalid number of arguments."
    searchTerm = validateSearchTerm({searchTerm: searchTerm})

    //2. configure token and query
    const api_url = `https://api.spotify.com/v1/search?query=${searchTerm}%20genre:rock&type=artist`;

    const data = await axios.get(api_url, {
      headers: {
        'Authorization': `Bearer ${process.env.AUTH_TOKEN}`
                }
    });

    let results = data.data.artists
    return results;



}

async function searchTracks(searchTerm, offset=20){

    //1. validate 
    if(arguments.length < 1) throw "Invalid number of arguments.";
    searchTerm = validateSearchTerm({searchTerm: searchTerm});
    
    //2. configure token and query
    const api_url = `https://api.spotify.com/v1/search?query=${searchTerm}%20genre:rock&type=track`;

    const data = await axios.get(api_url, {
      headers: {
        'Authorization': `Bearer ${process.env.AUTH_TOKEN}`
                }
    });

    let results = data.data.tracks;
    return results;

}

async function searchAlbums(searchTerm, offset=0){

    //1. validate 
    if(arguments.length < 1) throw "Invalid number of arguments.";
    searchTerm = validateSearchTerm({searchTerm: searchTerm});

    //2. configure token and query
    let spotifyApi = new SpotifyWebApi({
        clientId:  process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: 'localhost:4000'
      });

    spotifyApi.setAccessToken(process.env.AUTH_TOKEN);

    //3. query spotify
    let data = await spotifyApi.searchAlbums(searchTerm, {"offset": offset, "limit": 50});
    data = data.body.albums

    return data;

}


module.exports ={
    searchArtists,
    searchAlbums,
    searchTracks
}
