import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import {Card as BCard} from 'react-bootstrap/';
import ListGroup from 'react-bootstrap/ListGroup';
import Carousel from 'react-bootstrap/Carousel';
import Stack from 'react-bootstrap/Stack';

import { 
	Box,
	Card,
	CardHeader,
	CardContent,
	CardMedia,
	Typography,
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	ImageList,
	ImageListItem,
	ImageListItemBar,
	Grid
} from '@mui/material';

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
			<Box sx={{
				maxWidth: '50%', marginLeft: 'auto', marginRight: 'auto',
				display: 'flex', flexDirection: 'row'
					
				}}
			>
				<Card sx={{maxWidth: '50%'}}>
					<Typography variant="h1" component="h1">{artistData.name}</Typography>
						<CardMedia sx={{maxWidth: '90%', marginLeft: 'auto', marginRight: 'auto'}} component="img" image={artistData.images[0].url} alt={artistData.name}/>
					<CardContent>
						<Typography variant='body1'>
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
						</Typography>
					
					</CardContent>
				</Card>
				<Card sx={{}}>
					<CardContent>
					<Typography variant='h2' component='h2'>Top Tracks</Typography>
						<List>
							{
								artistTopTracks.tracks.map((track, index) => {
									return(
										<ListItem key={track.id}>
											<ListItemAvatar>
												<img
													width={50}
													height={50}
													src={track.album.images[0].url}
													alt={"Album Cover"}
												/>
											</ListItemAvatar>
											<ListItemText>
												<Link to={`/info/track/${track.id}`}>
													{track.name}
												</Link>
												
											</ListItemText>
										</ListItem>
									)
								})
							}
						</List>
					</CardContent>
				</Card>
			</Box>
			{/* <Box sx={{maxWidth: '50%', marginLeft: 'auto', marginRight: 'auto'}}>
				<Typography variant='h2' component='h2'>Albums</Typography>
				<ImageList sx={{maxWidth: '90%', marginLeft: 'auto', marginRight: 'auto'}}>
					{
						artistAlbums.items.map((album, index) => {
							return(
								<ImageListItem key={album.id} sx={{maxWidth: '50%'}}>
										<img
											width='50%'
											height='auto'
											src={album.images[0].url}
											alt={album.name}
										/>
										<Link to={`/info/album/${album.id}`}>
											{album.name}
										</Link>
								</ImageListItem>
							)
						})
					}
				</ImageList>
			</Box> */}
			<Box sx={{maxWidth: '50%', marginLeft: 'auto', marginRight: 'auto'}}>
				<Typography variant='h2' component='h2'>Albums</Typography>
				<Grid container spacing={{xs: 2, mid: 3}} columns={{xs: 4, sm: 8, md: 12}}>
					{
						artistAlbums.items.map((album, index) => {
							return(
								<Grid item xs={2} sm={4} md={4} key={album.id}>
									<Card sx={{maxWidth: '90%', marginLeft: 'auto', marginRight: 'auto'}}>
										<CardMedia sx={{maxWidth: '90%', marginLeft: 'auto', marginRight: 'auto'}} component="img" image={album.images[0].url} alt={album.name}/>
										<CardContent>
											<Link to={`/info/album/${album.id}`}>
												{album.name}
											</Link>
										</CardContent>
									</Card>
								</Grid>
							)
						})
					}
				</Grid>
			</Box>
		</div>
	);
};

export default ArtistPage;