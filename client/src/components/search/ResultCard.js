import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
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
         item.genres.forEach((genre, i) => {
            if(i==0 || i == item.genres.length-1) genres += genre.toString();
             genres += ", " + genre.toString(); 
         });
       
 
         return(
            <Card style={{ width: '60%' }}>
                <Row>
                <Col>
                    <Card.Header>{item.name}</Card.Header>
                </Col>
                </Row>

                <Row>
                <Col>
                    <Card.Img style={{width: "200px"}} variant="left" src={item.images[0] && item.images[0].url || noImg} alt="band image"/>        
                </Col>
                <Col>
                <ListGroup variant="flush">
                     <ListGroup.Item>Genres: {genres}</ListGroup.Item>
                 </ListGroup>
                </Col>
                </Row>
                 
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
            <Card style={{ width: '60%' }}>
                <Row>
                    <Col>
                        <Card.Header>{item.name || "Album name Unknown"}</Card.Header>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card.Img style={{width: "200px"}} variant="left" src={item.images[0] && item.images[0].url || noImg} alt="album image"/>        
                    </Col>
                    <Col>
                        <ListGroup variant="flush">
                            <ListGroup.Item>{item.release_date}</ListGroup.Item>
                            <ListGroup.Item>Artist(s): {artists}</ListGroup.Item>
                            <ListGroup.Item>Tracks: ({item.total_tracks})</ListGroup.Item>
                            <Button>Album Details</Button>
                        </ListGroup>
                    </Col>
                </Row>
                
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
            <Card style={{ width: '60%' }}>
                <Row>
                    <Col>
                        <Card.Header>{item.name || "Song name Unknown"}</Card.Header>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Card.Img style={{width: "200px"}} variant="left" src={item.album.images && item.album.images[0].url || noImg} alt="album image"/>        
                    </Col>
                    <Col>
                        <ListGroup variant="flush">
                            <ListGroup.Item>{item.release_date}</ListGroup.Item>
                            <ListGroup.Item>Artist(s): {artists}</ListGroup.Item>
                            <ListGroup.Item>Album: {item.album.name || "Unknown album name"}</ListGroup.Item>
                        </ListGroup>
                        <Button>Song Details</Button>
                    </Col>
                </Row>
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