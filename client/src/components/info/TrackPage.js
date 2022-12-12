import React, { useState } from 'react';

import Card from 'react-bootstrap/Card';

const TrackPage = (props) => {
	const trackData = props.infoData.foundTrack;
	const trackLyrics = props.infoData.foundLyrics;

	const MAX_LYRIC_LENGTH = 300;
	const [lyricsShowMore, setLyricsShowMore] = useState(false);

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
					<h2>Album: {trackData.album.name}</h2>
					<h2>Artists:</h2>
					{
						trackData.artists.map((artist) => { 
							return <p key={artist.id}>{artist.name}</p>
						})
					}
					<h2>Lyrics: </h2>
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
				</Card.Body>


			</Card>
		</div>
	);
}

export default TrackPage;