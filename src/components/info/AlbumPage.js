import React from 'react';
import { Link } from 'react-router-dom';


import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Carousel from 'react-bootstrap/Carousel';
import Stack from 'react-bootstrap/Stack';

const AlbumPage = (props) => {
	const albumData = props.infoData.foundAlbum;

	if(!props || !props.infoData || !albumData) return <p>Loading album, please wait... </p>;
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
					<h2>Artists:</h2>
					<ul>
						{
							albumData.artists.map((artist) => { 
								return <li key={artist.id}><Link to={`/info/artist/${artist.id}`} >{artist.name}</Link></li>
							})
						}
					</ul>
					<h2>Tracks:</h2>
					<ul>
						{
							albumData.tracks.items.map((track) => {
								return <li key={track.id}><Link to={`/info/track/${track.id}`} >{track.name}</Link></li>
							})
						}
					</ul>
				</Card.Body>


			</Card>
		</div>
	);
}

export default AlbumPage;