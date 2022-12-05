import React from 'react';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Carousel from 'react-bootstrap/Carousel';
import Stack from 'react-bootstrap/Stack';

const TrackPage = (props) => {
	const trackData = props.infoData.foundTrack;

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
					<p>Album: {trackData.album.name}</p>
					<p>Artists:</p>
					{
						trackData.artists.map((artist) => { 
							return <p key={artist.id}>{artist.name}</p>
						})
					}
				</Card.Body>


			</Card>
		</div>
	);
}

export default TrackPage;