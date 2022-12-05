import React from 'react';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Carousel from 'react-bootstrap/Carousel';
import Stack from 'react-bootstrap/Stack';


const ArtistPage = (props) => {
	const artistData = props.infoData.foundArtist;
	const artistTopTracks = props.infoData.foundArtistTopTracks;
	const artistAlbums = props.infoData.foundArtistAlbums;
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
				<Card.Img style={{width: '66%'}} src={artistData.images[0].url} />
					<h3>Genres</h3>
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
					<h3>Followers: {artistData.followers.total}</h3>
				</Card.Body>
			</Card>
				<h3>Top Tracks</h3>
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
											</Card>
											{
												track.length === 2
												?
												<Card>
													<img
														src={track[1].album.images[0].url}
														alt="First slide"
														/>
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
														<h3>{album[0].name}</h3>
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
														<h3>{album[1].name}</h3>
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