const axios = require('axios')
let helper = require('../helper')
const {validateQueryParam, checkString, validateSearchTerm} = helper.validations
const redis = require('redis');
let client;
if(process.env.REDISCLOUD_URL){
  client = redis.createClient(process.env.REDISCLOUD_URL, {no_ready_check: true});
}
else{
  client = redis.createClient();
}
client.connect().then(() => {});


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


async function searchArtists(searchTerm, page=0){

    //1. validate 
    if(arguments.length < 1) throw "Invalid number of arguments."
    searchTerm = validateSearchTerm({searchTerm: searchTerm});
    page = validateQueryParam(page);

    //2. check if term & page num in redis
    let key = searchTerm + "_" + page.toString() //the format for caching song pages is <searchTerm_pageNum>
    let artistPage = await client.hGet('artistPage', key);
    if(artistPage){
        let artists = await client.hGet('artistPage', key);
        return JSON.parse(artists);
    };

    //3. otherwise configure token and query API
    let offset = page*20;
    const api_url = `https://api.spotify.com/v1/search?query=${searchTerm}%20genre:rock&type=artist&offset=${offset}`;

    const data = await axios.get(api_url, {
      headers: {
        'Authorization': `Bearer ${process.env.AUTH_TOKEN}`
                }
    });

    //4. add page to redis
    let results = data.data.artists
    await client.hSet('artistPage', key, JSON.stringify(results))

    //4a. add each artist to redis to optimize album search speed
    for(let i=0; i<results.items.length;  i++){
      let id = results.items[i].id;
      await client.hSet('artistById', id, "true");
    };


    //5. return
    return results;

}

async function searchTracks(searchTerm, page=0){

    //1. validate 
    if(arguments.length < 1) throw "Invalid number of arguments.";
    searchTerm = validateSearchTerm({searchTerm: searchTerm});
    page = validateQueryParam(page);

    //2. check if term & page num in redis
    let key = searchTerm + "_" + page.toString() //the format for caching song pages is <searchTerm_pageNum>
    let songPage = await client.hGet('songPage', key);
    if(songPage){
        let songs = await client.hGet('songPage', key);
        return JSON.parse(songs);
    };

    //3. otherwise configure token and query API
    let offset = page*20;
    const api_url = `https://api.spotify.com/v1/search?query=${searchTerm}%20genre:rock&type=track&offset=${offset}`;

    const data = await axios.get(api_url, {
      headers: {
        'Authorization': `Bearer ${process.env.AUTH_TOKEN}`
                }
    });

    //4. add to redis
    let results = data.data.tracks;
    console.log(`Song page not found. Adding to redis.`)
    await client.hSet('songPage', key, JSON.stringify(results));

    //5. return
    return results;

}

async function searchAlbums(searchTerm, page=0){

    //1. validate 
    if(arguments.length < 1) throw "Invalid number of arguments.";
    searchTerm = validateSearchTerm({searchTerm: searchTerm});
    page = validateQueryParam(page);

    //2. check if term & page num in redis
    let key = searchTerm + "_" + page.toString() //the format for caching album pages is <searchTerm_pageNum>
    let albumPage = await client.hGet('albumPage', key);
    if(albumPage){
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
    await client.hSet('albumPage', key, JSON.stringify(results));

    //6. return
    return results

}

async function checkIfRock(id){
  /**This function checks whether an artist is a rock artist for album search */

  //1. validate
  id = id.toString()
  id = checkString(id)

  //2. check if in redis
  let artistSearch = await client.hGet('artistById', id);
  if(artistSearch){
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
  await client.hSet('artistById', id, isRock.toString());

  //5. return
  return isRock
  
}


module.exports ={
    searchArtists,
    searchAlbums,
    searchTracks
}
