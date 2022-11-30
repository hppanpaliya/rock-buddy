const axios = require('axios')
const SpotifyWebApi = require('spotify-web-api-node');
const helper = require('../helper')
const redis = require('redis');
const client = redis.createClient();
client.connect().then(() => {});

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

    //2. check if term & page num in redis
    let key = searchTerm + "_" + page.toString() //the format for caching album pages is <searchTerm_pageNum>
    let albumPage = await client.hGet('albumPage', key);
    if(albumPage){
        console.log(`album page found in redis`)
        let albums = await client.hGet('albumPage', key);
        return JSON.parse(albums);
    };

    //3. otherwise configure tolken and query API
    let offset = page*30;
    const api_url = `https://api.spotify.com/v1/search?query=${searchTerm}%20&type=album&limit=30&offset=${offset}`;

    const data = await axios.get(api_url, {
      headers: {
        'Authorization': `Bearer ${process.env.AUTH_TOKEN}`
                }
    });

    let results = data.data.albums;

    //4. filter albums for rock only
    let rockAlbums = []
    for(let i=0; i<results.items.length; i++){
      let artistId = results.items[i].artists[0].id;
      let isRock = await checkIfRock(artistId);

      if(isRock){
        rockAlbums.push(results.items[i])
      }
      if(i == results.items.length-1){
        results.items = rockAlbums
      }
    };

    //5. add to redis
    console.log(`Album page not found. Adding to redis.`)
    await client.hSet('albumPage', key, JSON.stringify(results));

    //6. return
    return results

}

async function checkIfRock(id){
  /**This function checks whether an artist is a rock artist for album search */

  //1. validate
  id = id.toString()

  //2. check if in redis
  // console.log(`checking redis for artist id ${id}...`)
    let artistSearch = await client.hGet('artistById', id);
    if(artistSearch){
        // console.log(`artist ID ${id} found in redis`)
        let artist = await client.hGet('artistById', id);
        artist = (artist === 'true')
        return artist;
    }

  //3. if not in redis, configure token and query
  const api_url = `https://api.spotify.com/v1/artists/${id}`;

  const data = await axios.get(api_url, {
    headers: {
      'Authorization': `Bearer ${process.env.AUTH_TOKEN}`
       }
    });
  
  let genres = data.data.genres;

  //3. check if rock artist
  let isRock = false;
  for(let i=0;i<genres.length;  i++){
    let genre = genres[i].toLowerCase()
    if(genre.indexOf("rock") !== -1){ //if we find a rock genre, the artist is rock artist
      isRock = true
      break
    }
  }

  //4. add artist to redis
  // console.log(`Artist ${id} not found. Adding to redis.`);
  await client.hSet('artistById', id, isRock.toString());

  //5. return
  return isRock
  
}


module.exports ={
    searchArtists,
    searchAlbums,
    searchTracks
}
