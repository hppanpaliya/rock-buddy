import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import noImg from '../../img/notFound.jpg'


const ResultCard = (props) =>{
    /**
     * Search result card for artist, album, and song search results
     */
    let data = props.searchData;
    if (!data) return;
    
    let searchType = props.searchType;
    let card = null

     function buildArtst(item){
         //genre data
         let genres = ""
         if (item.genres.length === 0){
             genres = "No genres found"
             };
         item.genres.forEach(genre => {
             genres += ", " + genre.toString(); 
         });
       
 
         return(
             <Card style={{ width: '30rem' }}>
                 <Card.Header>{item.name}</Card.Header>
                 <Card.Img variant="left" src={item.images[0] && item.images[0].url || noImg} alt="band image"/>        
                 <ListGroup variant="flush">
                     <ListGroup.Item>Genres: {genres}</ListGroup.Item>
                 </ListGroup>
             </Card>
         )


     }

     function buildAlbum(item){

        //artist data
        let artists = ""
        if (item.artists.length === 0){
            artists = "No artists found"
            };
        item.artists.forEach(artist => {
            artists += ", " + artist.name.toString(); 
        });

        return(
            <Card style={{ width: '30rem' }}>
                <Card.Header>{item.name || "Album name Unknown"}</Card.Header>
                <Card.Img variant="left" src={item.images[0] && item.images[0].url || noImg} alt="album image"/>        
                <ListGroup variant="flush">
                    <ListGroup.Item>{item.release_date}</ListGroup.Item>
                    <ListGroup.Item>Artist(s): {artists}</ListGroup.Item>
                    <ListGroup.Item>Tracks: ({item.total_tracks})</ListGroup.Item>
                </ListGroup>
            </Card>
        )
     }
    
    function buildSong(item){

        //artist data
        let artists = ""
        if (item.artists.length === 0){
            artists = "No artists found"
            };
        item.artists.forEach(artist => {
            artists += ", " + artist.name.toString(); 
        });

        return(
            <Card style={{ width: '30rem' }}>
                <Card.Header>{item.name || "Song name Unknown"}</Card.Header>
                <Card.Img variant="left" src={item.album.images && item.album.images[0].url || noImg} alt="album image"/>        
                <ListGroup variant="flush">
                    <ListGroup.Item>{item.release_date}</ListGroup.Item>
                    <ListGroup.Item>Artist(s): {artists}</ListGroup.Item>
                    <ListGroup.Item>Album: {item.album.name || "Unknown album name"}</ListGroup.Item>
                </ListGroup>
            </Card>
        )
     }

    if(searchType === "artists"){
        card = data.map((item) =>{
            return buildArtst(item)
         });
     }

    else if(searchType === "albums"){
        card = data.map((item) =>{
            return buildAlbum(item)
         });
     }

    else if(searchType === "songs"){
        card = data.map((item) =>{
            return buildSong(item)
         });
     }

    
    return(
        card
    )
};

export default ResultCard;