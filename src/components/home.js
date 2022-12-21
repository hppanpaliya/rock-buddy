import React, {useState} from 'react';
import Music from '../img/music2.jpg'
import './home.css'
import { useSelector } from "react-redux";
import { Row } from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import { Card } from 'react-bootstrap';

let bgImage = "https://imageio.forbes.com/blogs-images/markbeech/files/2018/01/Led-Zeppelin-%C2%A9-Neil-Zlozower-Six-Months-Use-Only-Do-Not-Use-After-of-July-24-2018_preview-1200x798.jpeg?format=jpg&width=1200"
const Home = (props) =>{
    const auth = useSelector((state) => state.auth);
    return(
        <div >
        <img width="100%" height="auto" src={Music} alt={"Home Page"}></img>
        <div className="typewriter">
             <h1>Rock Buddy...</h1>   
             
        </div>
        <div>
            <br></br>
            <h2 id="featuresheader">Features</h2>
            <br></br>
            <Row>
                <Col>
                <Card class="homecard">
                    <Card.Img variant="top" src="https://townsquare.media/site/366/files/2016/10/Iconic-Album-Covers.jpg?w=980&q=75" alt="albumcovers" />
                    <br></br>
                    <Card.Title>Song, Artist & Album Search</Card.Title>
                    <Card.Body>
                    <Card.Text>
                        Search for your favorite rock artists, albums and songs. Or, discover entirely new music and artists with our rock filtering search feature.
                    </Card.Text>
                    </Card.Body>
                </Card>
                </Col>

                <Col>
                <Card class="homecard">
                    <Card.Img class="card-img" variant="top" src="https://api.freelogodesign.org/assets/blog/thumb/4ddcba00db4142899d322683c681601a_1176x840.jpg?t=637541751210000000" alt="spotify"/>
                    <br></br>
                    <Card.Title>Spotify Integration</Card.Title>
                    <Card.Body>
                    <Card.Text>
                        Connect your Spotify account to Rock Buddy. You can play songs, view your playlists, add songs to your playlists, and more coming soon!
                    </Card.Text>
                    </Card.Body>
                </Card>
                </Col>

                <Col>
                <Card class="homecard">
                    <Card.Img variant="top" src="https://townsquare.media/site/295/files/2013/01/ACDC1.jpg?w=980&q=75" alt="live events"/>
                    <br></br>
                    <Card.Title>Live Rock Events</Card.Title>
                    <Card.Body>
                        <Card.Text>
                            Like concerts? Use our event search to find live events via ticketmaster. All of our events are filtred to rock only!
                        </Card.Text>
                    </Card.Body>
                </Card>
                </Col>
            </Row>

        </div>
        
        </div>
    )

};

export default Home;