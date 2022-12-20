import React, { useState } from 'react';

import { Link } from 'react-router-dom';

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
	Grid,
	Stack,
	Chip
} from '@mui/material';

const ArtistPage = (props) => {
	const artistData = props.infoData.foundArtist;
	const artistTopTracks = props.infoData.foundArtistTopTracks;
	const artistAlbums = props.infoData.foundArtistAlbums
	const artistDescription = props.infoData.foundArtistDescription;

	const MAX_DESC_LENGTH =  500;
	const [descShowMore, setDescShowMore] = useState(false);
	
	if(!props || !props.infoData || !artistData) return <p>Loading artist, please wait... </p>;
	return (
		<div>
			<Box sx={{
				maxWidth: '80%',
				marginLeft: 'auto', 
				marginRight: 'auto',
				display: 'flex', 
				flexDirection: 'row',   
				justifyContent: "center", 
				verticalAlign: "top"
				}}
			>
				<Card sx={{maxWidth: '50%', verticalAlign: "top", minHeight: '100vh'}}>
					<Typography variant="h1" component="h1">{artistData.name}</Typography>
					<CardMedia sx={{maxHeight: '70%', maxWidth: '70%', marginLeft: 'auto', marginRight: 'auto', borderRadius: '10px'}} component="img" image={artistData.images[0].url} alt={artistData.name}/>
					<CardContent>
						<Stack sx={{justifyContent: "center", paddingBottom: 2}} direction="row" spacing={1}>
							{
								artistData.genres.map((genre, index) => {
									return(
										<Chip label={genre}></Chip>
									)
								})
							}
						</Stack>
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
				<Card sx={{maxWidth: '30%',minHeight: '100vh'}}>
					<CardContent>
						<Typography variant='h2' component='h2'>Top Tracks</Typography>
						<List>
							{
								artistTopTracks.tracks.map((track, index) => {
									return(
										<ListItem key={track.id}>
											<ListItemAvatar>
												<img
													className="album-cover-thumbnail"
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
												{
													track.explicit
													? <Chip label="Explicit"></Chip>
													: null
												}
											</ListItemText>
										</ListItem>
									)
								})
							}
						</List>
						<Typography className='spotify-follower-count' variant='p'>Spotify Followers: {artistData.followers.total}</Typography>
					
					</CardContent>
				</Card>
			</Box>
			<Box sx={{maxWidth: '60%', marginLeft: 'auto', marginRight: 'auto'}}>
				<Typography variant='h2' component='h2'>Albums</Typography>
				<Grid container spacing={{xs: 2, mid: 3}} columns={{xs: 4, sm: 8, md: 12}}>
					{
						artistAlbums.items.map((album, index) => {
							return(
								<Grid item xs={2} sm={4} md={4} key={album.id}>
									<Card >
										<CardMedia component="img" image={album.images[0].url} alt={album.name}/>
										<CardContent>
											<Link to={`/info/album/${album.id}`}>{album.name}</Link>
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