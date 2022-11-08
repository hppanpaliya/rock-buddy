const axios = require('axios')
const SpotifyWebApi = require('spotify-web-api-node');



async function searchArtists(searchTerm, offset=20){

    //1. validate 

    //2. configure token and query
    const api_url = `https://api.spotify.com/v1/search?query=${searchTerm}%20genre:rock&type=artist`;

    const data = await axios.get(api_url, {
      headers: {
        'Authorization': `Bearer ${process.env.AUTH_TOKEN}`
                }
    });

    let results = data.data
    return results;



}

async function searchTracks(searchTerm, offset=20){

    //1. validate 

    //2. configure token and query
    const api_url = `https://api.spotify.com/v1/search?query=${searchTerm}%20genre:rock&type=track`;

    const data = await axios.get(api_url, {
      headers: {
        'Authorization': `Bearer ${process.env.AUTH_TOKEN}`
                }
    });

    let results = data.data
    return results;

}

async function searchAlbums(searchTerm, offset=0){

    //1. validate 

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


async function test(authOptions){
    try{
        // await searchArtists("pink floyd")

    }catch(e){
        console.log(e)
    }
}

module.exports ={
    searchArtists,
    searchAlbums,
    searchTracks
}






// async function generateToken(){
//     var client_id = '8accb0b6bde847479dbbe3b84de47da2'; // Your client id
//     var client_secret = '904a75323e014acead321af7806f3130'; // Your secret
   
//     const data = await axios.request({
//         url: "https://accounts.spotify.com/api/token",
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//             "Authorization": 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
//         },
//         params: {
//             grant_type: "client_credentials",
//           }
//     })
//     return data.data.access_token

// }
