import React from 'react';
import { Link } from 'react-router-dom';

import SendLinkMessage from "./../firebase/Chat/SendLinkMessage"

import { useSelector } from "react-redux";

import CommentSection from "./../profile/comments/albumComments.js"

import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Typography,
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	Stack,
	Chip
} from '@mui/material'


const msToMinutesAndSeconds = (ms) => {
	let minutes = Math.floor(ms / 60000);
	let seconds = ((ms % 60000) / 1000).toFixed(0);
	return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

const AlbumPage = (props) => {
	const albumData = props.infoData.foundAlbum;
	const albumId = window.location.pathname.split("/")[3];

	const auth = useSelector((state) => state.auth.user);
	const spotify = useSelector((state) => state.spotify.token);

	if(!props || !props.infoData || !albumData) return <p>Loading album, please wait... </p>;
	return (
		<div>
			<Box sx={{
				maxWidth: '50%',
				marginLeft: 'auto', 
				marginRight: 'auto',
				justifyContent: 'center'
				}}
			>
				<Card>
					<Typography variant='h1' component='h1'>{albumData.name}</Typography>
					<CardMedia sx={{maxHeight: '70%', maxWidth: '70%', marginLeft: 'auto', marginRight: 'auto', borderRadius: '10px'}} component='img' image={albumData.images[0].url} alt={albumData.name}/>
					<CardContent>
						<Typography variant='h2' component='h2'>Rock Artists</Typography>

						<Stack direction='row' sx={{justifyContent: "center"}}>
							{
								albumData.artists.map((artist, index) => { 
									return(
										<Card key={artist.id} sx={{padding: 2}}>
											<Link to={`/info/artist/${artist.id}`}><Typography>{artist.name}</Typography></Link>
											<CardMedia
												sx={{maxHeight: '100px', maxWidth: '100px', marginLeft: 'auto', marginRight: 'auto', borderRadius: '10px'}}
												component='img'
												image={artist.image}
												alt={artist.name}/>
										</Card>
									)
								})
							}
						</Stack>
						<Typography variant='h2' component='h2'>Album Info</Typography>

						<Typography>Release Date: {albumData.release_date}</Typography>
						<Typography>Popularity Index: {albumData.popularity}%</Typography>
						<Typography>Total Tracks: {albumData.total_tracks}</Typography>
						<Typography>Label: {albumData.label}</Typography>			
						{auth && auth.uid ? <SendLinkMessage trackId={albumData.id} />: null}

					</CardContent>
				</Card>
				<Card>
					<CardContent>
						<Typography variant='h2' component='h2'>Rock Tracks</Typography>
						<List>
							{
								albumData.tracks.items.map((track, index) => {
									return(
										<ListItem key={index}>
											<ListItemAvatar>
												<img
													className="album-cover-thumbnail"
													width={100}
													height={100}
												 	src={albumData.images[0].url} 
													alt={track.name} 
												/>
											</ListItemAvatar>
											<ListItemText sx={{paddingLeft: 2}}>
												<Stack direction="column">
													<Typography sx={{fontSize: 20 }} component='span' className='track-list-title'>
														<Link to={`/info/track/${track.id}`}>
															{track.name}
														</Link>
													</Typography>
													<Typography component='span' className='track-list-subtitle'>
														{"\t" + track.artists[0].name} - {msToMinutesAndSeconds(track.duration_ms)}
													</Typography>
													{
														track.explicit
														? <Chip label='Explicit'></Chip> 
														: null

													}
												</Stack>
											</ListItemText>

										</ListItem>
									)
								})
							}
						</List>
					</CardContent>
				</Card>
			</Box>

			<CommentSection albumId={albumId} />
		</div>
	);
}

export default AlbumPage;