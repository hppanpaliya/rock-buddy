import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CommentSection from "./../profile/comments/trackComments.js"
import AddTrackToPlaylist from "./../profile/addSong"
import SendLinkMessage from "./../firebase/Chat/SendLinkMessage"

import { useDispatch, useSelector } from "react-redux";

import {
	Box,
	Card,
	CardMedia,
	Typography,
	Stack,
} from '@mui/material'

const TrackPage = (props) => {
	const trackData = props.infoData.foundTrack;
	const trackLyrics = props.infoData.foundLyrics;
	const trackId = window.location.pathname.split("/")[3];
	const auth = useSelector((state) => state.auth.user);
	const spotify = useSelector((state) => state.spotify.token);
	console.log(auth);
	console.log("spotify");
	console.log(spotify);
	console.log(auth);


	const MAX_LYRIC_LENGTH = 300;
	const [lyricsShowMore, setLyricsShowMore] = useState(false);

	const userState = useSelector((state) => state);

	const msToMinutesAndSeconds = (ms) => {
		let minutes = Math.floor(ms / 60000);
		let seconds = ((ms % 60000) / 1000).toFixed(0);
		return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
	}

	if(!props || !props.infoData || !trackData) return <p>Loading track, please wait... </p>;
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
					<Typography variant='h1' component='h1'>{trackData.name}</Typography>
					<CardMedia sx={{maxHeight: '70%', maxWidth: '70%', marginLeft: 'auto', marginRight: 'auto', borderRadius: '10px'}} component='img' image={trackData.album.images[0].url} alt={trackData.name}/>
					<Typography variant='h2' component='h2'>Rock Artists</Typography>
					<Stack direction='row' sx={{justifyContent: "center"}}>
						{
							trackData.artists.map((artist, index) => { 
								return(
									<Card sx={{padding: 2}}>
										<Link key={artist.id} to={`/info/artist/${artist.id}`}><Typography>{artist.name}</Typography></Link>
										<CardMedia
											sx={{maxHeight: '100px', maxWidth: '100px', marginLeft: 'auto', marginRight: 'auto', borderRadius: '10px'}}
											component='img'
											image={artist.image}
											alt={artist.name}
										/>
									</Card>
								)
							})
						}
					</Stack>
					<Typography variant='h2' component='h2'>Track Info</Typography>
					<Typography>Album: {<Link to={`/info/album/${trackData.album.id}`}>{trackData.album.name}</Link>}</Typography>
					<Typography>Duration: {msToMinutesAndSeconds(trackData.duration_ms)}</Typography>
					<Typography>Track Number: {trackData.track_number}</Typography>
					<Typography>Popularity Index: {trackData.popularity}%</Typography>
					<Typography variant='h2' component='h2'>Lyrics</Typography>
					{
						trackLyrics.length > MAX_LYRIC_LENGTH && !lyricsShowMore
						? 	<span style={{whiteSpace: 'pre-line'}}>
								{trackLyrics.substring(0, MAX_LYRIC_LENGTH)}...{"\n"}
								<a style={{color: 'blue'}} onClick={() => setLyricsShowMore(true)}>Show More</a>
						  	</span>
						: <span style={{whiteSpace: 'pre-line'}}>
							{trackLyrics}{"\n"}
							<a style={{color: 'blue'}} onClick={() => setLyricsShowMore(false)}>Show Less</a>
						</span >
					}
				</Card>
			</Box>

				{auth && auth.uid ? <SendLinkMessage trackId={trackId} />: null}
				<br />
				{spotify ? <AddTrackToPlaylist trackId={trackId} /> : null}
				<br />
				<CommentSection trackId={trackId} />
		</div>
	);
}

export default TrackPage;