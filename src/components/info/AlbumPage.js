import React from 'react';
import { Link } from 'react-router-dom';

import CommentSection from "./../profile/comments/albumComments.js"

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
	Grid,
	Stack
} from '@mui/material'

const AlbumPage = (props) => {
	const albumData = props.infoData.foundAlbum;
	const albumId = window.location.pathname.split("/")[3];

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
					<CardMedia sx={{maxHeight: '60vh', maxWidth: '90%', marginLeft: 'auto', marginRight: 'auto', borderRadius: '10px'}} component='img' image={albumData.images[0].url} alt={albumData.name}/>
					<CardContent>
							<Typography variant='h2' component='h2'>Rock Artists</Typography>
							<Stack>
								{
								albumData.artists.map((artist, index) => {
									return(
										<Link to={`/info/artist/${artist.id}`}><Typography variant='h5' component='h5'>{artist.name}</Typography></Link>
									)
								})
							}
							</Stack>

						<Typography variant='h5' component='h5'>Release Date: {albumData.release_date}</Typography>
						
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
												<Typography variant='subtitle1'>
													<Link to={`/info/track/${track.id}`}>
														{track.name}
													</Link>
												</Typography>
												<Typography variant='subtitle2'>{track.artists[0].name}</Typography>
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