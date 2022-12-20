import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import noImg from '../../img/notFound.jpg'
import Nav from 'react-bootstrap/Nav';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';


import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';

const ResultCard = (props) =>{
    /**
     * Search result card for artist, album, and song search results
     */
    let data = props.searchData;
    if (!data) return;
    
    let searchType = props.searchType;
    let card = null

     function buildArtst(item,count){
         //genre data
         let genres = ""
         if (item.genres.length === 0){
             genres = "No genres found"
             };
         item.genres.forEach((genre, i) => {
            if(i==0 || i == item.genres.length-1) genres += genre.toString();
             genres += ", " + genre.toString(); 
         });
         
         let id = item.id
 
         return(
            <div key={count}>
            <Card style={{ width: '60%',
				align: 'center',
                marginLeft: 'auto',
				marginRight: 'auto'}}>            
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
                     <Button as={Link} to={`/info/artist/${id}`}>Artist Details</Button>
                 </ListGroup>
                </Col>
                </Row>
             </Card>
            </div>
         )


     }

     function buildAlbum(item,count){

        //artist data
        let artists = ""
        if (item.artists.length === 0){
            artists = "No artists found"
            };
        item.artists.forEach(artist => {
            artists += ", " + artist.name.toString(); 
        });
        let id = item.id

         return (
            <div key={count}>
            <Card  style={{ width: '60%',
            align: 'center',
            marginLeft: 'auto',
            marginRight: 'auto'}}>
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
                            <Button as={Link} to={`/info/album/${id}`}>Album Details</Button>
                        </ListGroup>
                    </Col>
                </Row>
                
                 </Card>
                 </div>
        )
     }
    
    function buildSong(item,count){

        //artist data
        let artists = ""
        if (item.artists.length === 0){
            artists = "No artists found"
            };
        item.artists.forEach(artist => {
            artists += ", " + artist.name.toString(); 
        });
        let id = item.id;

        return (
            <div key={count}>
            <Card  style={{ width: '60%',
            align: 'center',
            key: count,
            marginLeft: 'auto',
            marginRight: 'auto'}}>
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
                        <Button as={Link} to={`/info/track/${id}`}>Song Details</Button>
                    </Col>
                </Row>
                </Card>
                </div>
        )
     }

    if(searchType === "artists"){
        card = data.map((item,count) =>{
            return buildArtst(item,count)
         });
     }

    else if(searchType === "albums"){
        card = data.map((item,count) =>{
            return buildAlbum(item,count)
         });
     }

    else if(searchType === "songs"){
        card = data.map((item,count) =>{
            return buildSong(item,count)
         });
     }

    
    return(
        card
    )
};

export default ResultCard;