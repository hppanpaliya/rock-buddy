import React from 'react';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Carousel from 'react-bootstrap/Carousel';
import Stack from 'react-bootstrap/Stack';

const AlbumPage = (props) => {
	const albumData = props.infoData.foundAlbum;

	return (
		<div>
			<Card style={{
				width: '52rem',
				align: 'center',
				marginLeft: 'auto',
				marginRight: 'auto'
			}}>
				<Card.Header>
					<h1>{albumData.name}</h1>
				</Card.Header>
				<Card.Body>
					<Card.Img style={{ width: '66%' }} src={albumData.images[0].url} alt={albumData.name}/>
					<h2>Release Date: {albumData.release_date}</h2>
					
				</Card.Body>


			</Card>
		</div>
	);
}

export default AlbumPage;