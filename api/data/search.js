const axios = require('axios')
const SpotifyWebApi = require('spotify-web-api-node');



async function searchArtists(searchTerm, offset=20){

    //1. validate 

    //2. configure token and query
    let spotifyApi = new SpotifyWebApi({
        clientId:  process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: 'localhost:4000'
      });

    spotifyApi.setAccessToken(process.env.AUTH_TOKEN);

    //3. query spotify
    let data = await spotifyApi.searchArtists(searchTerm, {"offset": offset});
    data = data.body.artists

    // 4.filter data for only rock artists
    let filtered = []
    data.items.forEach(artist => {
        let rockArtist = false
        if(artist.genres.length == 0){
            return
        };
       
        artist.genres.forEach(genre =>{
            if (genre.indexOf("rock") !== -1){
                rockArtist = true
                return;
            }
        })

        if(rockArtist){
            filtered.push(artist)
        }
    });

    //5. set data as filtered artists
    data.items = filtered

    return data;



}

async function searchTracks(searchTerm, offset=20){

    //1. validate 

    //2. configure token and query
    let spotifyApi = new SpotifyWebApi({
        clientId:  process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: 'localhost:4000'
      });

    spotifyApi.setAccessToken(process.env.AUTH_TOKEN);

    //3. query spotify
    let data = await spotifyApi.searchTracks(searchTerm, {"offset": offset});
    data = data.body.tracks    

    return data;

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


    //4.filter data for only rock artists
    // let filtered = []
    // data.items.forEach(album => {
    //     let rockAlbum = false
    //     if(album.genres.length == 0){
    //         return
    //     };
       
    //     album.genres.forEach(genre =>{
    //         if (genre.indexOf("rock") !== -1){
    //             rockAlbum = true
    //             return;
    //         }
    //     })

    //     if(rockAlbum){
    //         filtered.push(album)
    //     }
    // });

    //5. set data as filtered artists
    // data.items = filtered

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
