import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Carousel from 'react-bootstrap/Carousel';
import Stack from 'react-bootstrap/Stack';


const ArtistPage = (props) => {
	const artistData = props.infoData.foundArtist;
	const artistTopTracks = props.infoData.foundArtistTopTracks;
	const artistAlbums = props.infoData.foundArtistAlbums
	const artistDescription = props.infoData.foundArtistDescription;

	const MAX_DESC_LENGTH = 300;
	const [descShowMore, setDescShowMore] = useState(false);
	

	if(!props || !props.infoData || !artistData) return <p>Loading artist, please wait... </p>;
	return (
		<div>
		<Card style={{ 
			width: '52rem',
			align: 'center',
			marginLeft: 'auto',
			marginRight: 'auto',
		}}>
			<Card.Header>
				<h1>{artistData.name}</h1>
			</Card.Header>
			<Card.Body>
				<Card.Img style={{width: '66%'}} src={artistData.images[0].url} alt={artistData.name} />
					<h2>Genres</h2>
					<ListGroup style={{width: '12rem', align: 'center', marginLeft: 'auto', marginRight: 'auto',}}>
						{ 
							artistData.genres.map((genre) => { 
								genre = genre.split(" ").map(word => { return word[0].toUpperCase() + word.substring(1)}).join(" ")
								return(
									<ListGroup.Item key={genre}>{genre}</ListGroup.Item>
								)									
							})
						}
					</ListGroup>
					<h2>Followers: {artistData.followers.total}</h2>
					<h2>Description:</h2>
					{ 
						artistDescription.length > MAX_DESC_LENGTH && !descShowMore
						? 	<span style={{whiteSpace: 'pre-line'}}>
								{artistDescription.substring(0, MAX_DESC_LENGTH)}...{ "\n" }
								<a  style={{color: 'blue' }} onClick={() => setDescShowMore(true)}>Show More</a>
							</span>
						: 	<span style={{whiteSpace: 'pre-line'}}>
								{artistDescription + "\n"}
								<a style={{color: 'blue' }} onClick={() => setDescShowMore(false)}>Show Less</a>
							</span>
					}
				</Card.Body>
			</Card>
				<h2>Top Tracks</h2>
				<Carousel
					style={{
						width: '42rem',
						align: 'center',
						marginLeft: 'auto',
						marginRight: 'auto',
					}}
				>
					{
						artistTopTracks.tracks.reduce( (acc, track, index, array) => {
							if( index % 2 === 0) acc.push(array.slice(index, index + 2));
							return acc;
						}, [])
						.map((track) => {
							return (
									<Carousel.Item key={track[0].id}>
										<Stack
											direction="horizontal"
											className="h-100 justify-content-center align-items-center"
											gap={3}
											max-width="10%"
											max-height="10%"
										>
											<Card>
												<img
													src={track[0].album.images[0].url}
													alt="First slide"
													/>
													<Carousel.Caption>
														<Link to={`/info/track/${track[0].id}`}>{track[0].name}</Link>
													</Carousel.Caption>
											</Card>
											{
												track.length === 2
												?
												<Card>
													<img
														src={track[1].album.images[0].url}
														alt="First slide"
														/>
													<Carousel.Caption>
														<Link to={`/info/track/${track[1].id}`}>{track[1].name}</Link>
													</Carousel.Caption>
												</Card>
												: null
											}

										</Stack>
									</Carousel.Item>
							)
						})
					}
				</Carousel>
				<h3>Albums</h3>
				<Carousel
					style={{
						width: '42rem',
						align: 'center',
						marginLeft: 'auto',
						marginRight: 'auto',
					}}
				>
					{
						artistAlbums.items.reduce( (acc, track, index, array) => {
							if( index % 2 === 0) acc.push(array.slice(index, index + 2));
							return acc;
						}, [])
						.map((album) => {
							return (
									<Carousel.Item key={`${album[0].id}`}>
										<Stack
											direction="horizontal"
											className="h-100 justify-content-center align-items-center"
											gap={3}
											max-width="10%"
											max-height="10%"
										>
											<Card>
												<img
													src={album[0].images[0].url}
													alt="First slide"
													/>
													<Carousel.Caption>
														<Link to={`/info/album/${album[0].id}`}>{album[0].name}</Link>
													</Carousel.Caption>
											</Card>
											{
												album.length === 2
												?
												<Card>
													<img
														src={album[1].images[0].url}
														alt="First slide"
														/>
													<Carousel.Caption>
														<Link to={`/info/album/${album[1].id}`}>{album[1].name}</Link>
													</Carousel.Caption>
												</Card>
												: null
											}

										</Stack>
									</Carousel.Item>
							)
						})
					}
				</Carousel>
		</div>
	);
};

export default ArtistPage;