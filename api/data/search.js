const axios = require('axios')
const SpotifyWebApi = require('spotify-web-api-node');
const helper = require('../helper')
const {validateSearchTerm} = helper.validations

  //How to use Spotify NPM package instead of axios
  //-----------------------------------------------
  //configure token and query
    // let spotifyApi = new SpotifyWebApi({
    //     clientId:  process.env.CLIENT_ID,
    //     clientSecret: process.env.CLIENT_SECRET,
    //     redirectUri: 'localhost:4000'
    //   });

    // spotifyApi.setAccessToken(process.env.AUTH_TOKEN);

    // //3. query spotify
    // let offset = page*20;
    // let data = await spotifyApi.searchAlbums(searchTerm, {"offset": offset, "limit": 20});
    // data = data.body.albums


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
    const api_url = `https://api.spotify.com/v1/search?query=${searchTerm}%20genre:rock&type=track&offset=${offset}`;

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
    
    //2. configure tolken and query
    let offset = page*50;
    const api_url = `https://api.spotify.com/v1/search?query=${searchTerm}%20&type=album&limit=50&offset=${offset}`;

    const data = await axios.get(api_url, {
      headers: {
        'Authorization': `Bearer ${process.env.AUTH_TOKEN}`
                }
    });

    let results = data.data.albums;

    //3. filter albums for rock only
    let rockAlbums = []
    for(let i=0; i<results.items.length; i++){
      let artistId = results.items[i].artists[0].id
      console.log(artistId)
      let isRock = await checkIfRock(artistId)
      // console.log("is rock? " + isRock.toString())
      if(isRock){
        console.log(true)
        rockAlbums.push(results.items[i])
      }
      if(i == results.items.length-1){
        console.log(rockAlbums.length)
        results.items = rockAlbums
        return results;

      }
    };

}

async function checkIfRock(id){
  //1. validate

  //2. configure tolken and query
  const api_url = `https://api.spotify.com/v1/artists/${id}`;
  console.log('here 2')
  const data = await axios.get(api_url, {
    headers: {
      'Authorization': `Bearer ${process.env.AUTH_TOKEN}`
       }
    });
  
  let genres = data.data.genres;

  //3. check if rock
  let isRock = false;
  for(let i=0;i<genres.length;  i++){
    let genre = genres[i].toLowerCase()
    if(genre.indexOf("rock") !== -1){ //if we find a rock genre, the artist is rock artist
      isRock = true
      break
    }
  }

  return isRock
  
}


module.exports ={
    searchArtists,
    searchAlbums,
    searchTracks
}
