import React from 'react';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Carousel from 'react-bootstrap/Carousel';
import Stack from 'react-bootstrap/Stack';

const TrackPage = (props) => {
	const trackData = props.infoData.foundTrack;
	const trackLyrics = props.infoData.foundLyrics;

	return (
		<div>
			<Card style={{
				width: '52rem',
				align: 'center',
				marginLeft: 'auto',
				marginRight: 'auto'
			}}>
				<Card.Header>
					<h1>{trackData.name}</h1>
				</Card.Header>
				<Card.Body>
					<Card.Img style={{ width: '66%' }} src={trackData.album.images[0].url} alt={trackData.name}/>
					<h2>Album: {trackData.album.name}</h2>
					<h2>Artists:</h2>
					{
						trackData.artists.map((artist) => { 
							return <p key={artist.id}>{artist.name}</p>
						})
					}
					<h2>Lyrics: </h2>
					<span style={{whiteSpace: 'pre-line'}}>{trackLyrics}</span>
				</Card.Body>


			</Card>
		</div>
	);
}

export default TrackPage;