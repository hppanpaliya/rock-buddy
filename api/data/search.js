const axios = require('axios')
const SpotifyWebApi = require('spotify-web-api-node');
const helper = require('../helper')
const {validateSearchTerm} = helper.validations



async function searchArtists(searchTerm, page){

    //1. validate 
    if(arguments.length < 1) throw "Invalid number of arguments."
    searchTerm = validateSearchTerm({searchTerm: searchTerm})

    //2. configure token and query
    let offset = page*20;
    const api_url = `https://api.spotify.com/v1/search?query=${searchTerm}%20genre:rock&type=artist&offset=${offset}`;

    const data = await axios.get(api_url, {
      headers: {
        'Authorization': `Bearer ${process.env.AUTH_TOKEN}`
                }
    });

    let results = data.data.artists
    return results;

}

async function searchTracks(searchTerm, page){

    //1. validate 
    if(arguments.length < 1) throw "Invalid number of arguments.";
    searchTerm = validateSearchTerm({searchTerm: searchTerm});

    //2. configure token and query
    let offset = page*20;
    const api_url = `https://api.spotify.com/v1/search?query=${searchTerm}%20genre:rock&type=track&limit=50&offset=${offset}`;

    const data = await axios.get(api_url, {
      headers: {
        'Authorization': `Bearer ${process.env.AUTH_TOKEN}`
                }
    });

    let results = data.data.tracks;
    return results;

}

async function searchAlbums(searchTerm, page){

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
    let offset = page*20;
    let data = await spotifyApi.searchAlbums(searchTerm, {"offset": offset, "limit": 20});
    data = data.body.albums

    return data;

}


module.exports ={
    searchArtists,
    searchAlbums,
    searchTracks
}
