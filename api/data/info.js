const axios = require('axios')
const helper = require('../helper');
const { SPOTIFY_API_BASE_URL, GENIUS_API_BASE_URL } = helper.constants;
const { checkString } = helper.validations;

const redis = require('redis');
let client;
if(process.env.REDISCLOUD_URL){
  client = redis.createClient(process.env.REDISCLOUD_URL, {no_ready_check: true});
}
else{
  client = redis.createClient();
}
client.connect().then(() => {});

const https = require('https');
const fs = require('fs');
const gm = require('gm');

const lyricsParse = require('lyrics-parse');
/**
 * Gets an artist given an id
 * 
 * @param {string} id
 * 
 * @returns {object} artist
 * @throws {Error} if artist is not a rock artist
 */
async function getArtistById(id) { 
	id = checkString(id);

	const exists = await client.exists(`artist.${id}`);
	
	if(exists) {
		const artist = await client.get(`artist.${id}`);
		return JSON.parse(artist);
	} else {
		// Check if the artist's rock status is already stored in redis
		// It would be already stored if the artist was searched for before
		const rockCheck = await client.hGet("artistById", id);	
		if(rockCheck && rockCheck !== "true") throw new Error("SArtist is not a rock artist!");
		
		// Otherwise, get the artist from the API
		const response = await axios.get(`${SPOTIFY_API_BASE_URL}/artists/${id}`,
			{
				headers: { 'Authorization': `Bearer ${process.env.AUTH_TOKEN}` }
			}
		);

		const artist = response.data;
		// If the artist is not a rock artist, store that result in Redis, and throw an error
		if(!artist.genres.some(genre => genre.toLowerCase().includes("rock")) && artist.name.toLowerCase() !== "various artists") {
			await client.hSet("artistById", id, "false");
			throw new Error("Artist is not a rock artist!");
		}

		// If the artist is a rock artist, store that result along with the artist details in Redis
		await client.hSet("artistById", id, "true");
		await client.set(`artist.${id}`, JSON.stringify(artist));

		return artist;
	}
}

/**
 * 
 * @param {string} id 
 * @returns {object} top tracks for artist
 */
async function getArtistTopTracksById(id) { 

	id = checkString(id);
	const exists = await client.exists(`artist.${id}.topTracks`);

	if(exists) {
		const topTracks = await client.get(`artist.${id}.topTracks`);
		return JSON.parse(topTracks);
	} else {
		const response = await axios.get(`${SPOTIFY_API_BASE_URL}/artists/${id}/top-tracks?country=US`,
			{
				headers: { 'Authorization': `Bearer ${process.env.AUTH_TOKEN}` }
			}
		);
		const topTracks = response.data;

		// This function would only be called for known rock artists
		// So we can store that every track is a rock track for this artist
		for(let i = 0; i < topTracks.tracks.length; i++) {
			await client.hSet("trackById", topTracks.tracks[i].id, "true");
		}

		await client.set(`artist.${id}.topTracks`, JSON.stringify(topTracks));
		return response.data;
	}
}

/**
 * 
 * @param {string} id - artist id
 * @returns {object} albums for artist
 */
async function getArtistAlbumsById(id) { 
	id = checkString(id);
	const exists = await client.exists(`artist.${id}.albums`);
	
	if(exists) { 
		const albums = await client.get(`artist.${id}.albums`);
		return JSON.parse(albums);
	} else { 
		const response = await axios.get(`${SPOTIFY_API_BASE_URL}/artists/${id}/albums?include_groups=album&market=US`,
			{
				headers: { 'Authorization': `Bearer ${process.env.AUTH_TOKEN}` }
			}
		);
		const albums = response.data;
		
		const seenNames = [];
		albums.items = albums.items.filter((album) => {
			if(seenNames.includes(album.name.toLowerCase())){
				return false;
			}
		
			seenNames.push(album.name.toLowerCase());
			return true;
		});

		// This function would only be called for known rock artists
		// So we can store that every album is a rock album for this artist
		for(let i = 0; i < albums.items.length; i++) {
			await client.hSet("albumById", albums.items[i].id, "true");
		}
		await client.set(`artist.${id}.albums`, JSON.stringify(albums));
		return albums;
	}
}

/**
 * 
 * @param {string} id 
 * @param {string} artistName 
 * @returns {string} description of artist
 */
async function getArtistDescription(id, artistName) { 
	
	id = checkString(id);
	artistName = checkString(artistName);
	const exists = await client.exists(`artist.${id}.description`);
	
	if(exists) { 
		const description = await client.get(`artist.${id}.description`);
		return description;
	} else { 
		const searchResponse = await axios.get(`${GENIUS_API_BASE_URL}/search?q=${artistName}`, 
			{
				headers: { 'Authorization': `Bearer ${process.env.GENIUS_ACCESS_TOKEN}` }
			}
		);
		const artistId = searchResponse.data.response.hits[0].result.primary_artist.id;
		const artistResponse = await axios.get(`${GENIUS_API_BASE_URL}/artists/${artistId}?text_format=plain`,
			{
				headers: { 'Authorization': `Bearer ${process.env.GENIUS_ACCESS_TOKEN}` }
			}
		);
		let description = artistResponse.data.response.artist.description.plain;
		if(!description || description.trim().length === 0 || description === "?") { 
			description = "No description available."
		}
		await client.set(`artist.${id}.description`, description);
		return description;
	}
}

async function checkRockArtistHelper(id) { 
	try { 
		await getArtistById(id);
		return true;
	} catch (e) { 
		return false;
	}
}

/**
 * Gets an album given an id
 * 
 * @param {string} id
 * @returns {object} album
 * @throws {Error} if album is not a rock album (i.e. has no rock artists)
 */
async function getAlbumById(id) { 

	id = checkString(id);
	
	const exists = await client.exists(`album.${id}`);

	if(exists) {
		const album = await client.get(`album.${id}`);
		return JSON.parse(album);
	} else {
		
		const rockCheck = await client.hGet("albumById", id);
		if(rockCheck && rockCheck !== "true") throw new Error("Album is not a rock album!");
		
		const response = await axios.get(`${SPOTIFY_API_BASE_URL}/albums/${id}`,
			{
				headers: { 'Authorization': `Bearer ${process.env.AUTH_TOKEN}` }
			}
		);
		const album = response.data;

		let isRock = false;
		const albumArtists = album.artists.map((artist) => artist.id);
		const nonRockIndices = [];
		const nonRockTrackIndices = [];

		const rockArtistIds = [];

		for(let i = 0; i < albumArtists.length; i++) { 

			// Check if the artist's rock status was already stored in Redis
			const rockCheck = await client.hGet("artistbyId", albumArtists[i]);
			if(rockCheck && rockCheck !== "true") {
				nonRockIndices.push(i);
				continue;
			}	// If the artist is not rock, skip to the next artist

			// Otherwise, get the artist. We are able to retrieve the artist, then they are rock. 
			try { 
				const curArtist = await getArtistById(albumArtists[i]);
				// Extreme case; if the Artist is "Various Artists", we must check if every track has a rock artist
				if(curArtist.name.toLowerCase() === "various artists") {
					for(let i = 0; i < album.tracks.items.length; i++) { 
						const trackArtists = album.tracks.items[i].artists;
						let trackIsRock = false;
						for(let j = 0; j < trackArtists.length; j++) {
							if(await checkRockArtistHelper(trackArtists[j].id)) {
								trackIsRock = true;
								break;
							}
						}
						if(!trackIsRock) {
							nonRockTrackIndices.push(i);
						}
					}
				}

				//
				// Call functions to retrieve the rest of the Artist's data
				// But do not wait, since this function is not dependent on their execution/return values
				getArtistTopTracksById(albumArtists[i]);
				getArtistAlbumsById(albumArtists[i]);
				getArtistDescription(albumArtists[i], curArtist.name);
				
				isRock = true;
				await client.hSet("artistById", albumArtists[i], "true");	// Set the artist's rock status to true
				await client.set(`artist.${curArtist.id}`, JSON.stringify(curArtist));
			} catch (e) {
				console.log("E", e);
				nonRockIndices.push(i);
				await client.hSet("artistById", albumArtists[i], "false");	// Set the artist's rock status to false
			}
		}
		if(nonRockTrackIndices === album.tracks.items.length) isRock = false;	// If the number of non-rock tracks is equal to the number of tracks, the album is not rock
		if(!isRock) throw new Error("Album is not a rock album!");

		// Remove non-rock artists from the album
		album.artists = album.artists.filter((artist, index) => !nonRockIndices.includes(index));
		album.tracks.items = album.tracks.items.filter((track, index) => !nonRockTrackIndices.includes(index));

		await client.hSet("albumById", id, isRock.toString());
		await client.set(`album.${id}`, JSON.stringify(album));
		return album;
	}
}
/**
 * Gets an track given an id
 * 
 * @param {string} id
 * 
 * @returns {object} track
 */
async function getTrackById(id) {
	
	id = checkString(id);
	const exists = await client.exists(`track.${id}`);

	if(exists) { 
		const track = await client.get(`track.${id}`);
		return JSON.parse(track);
	} else {

		const rockCheck = await client.hGet("trackById", id);
		if(rockCheck && rockCheck !== "true") throw new Error("Track is not a rock track!");

		const response = await axios.get(`${SPOTIFY_API_BASE_URL}/tracks/${id}`,
			{
				headers: { 'Authorization': `Bearer ${process.env.AUTH_TOKEN}` }
			}
		);
		const track = response.data;

		let isRock = false;
		const trackArtists = track.artists.map((artist) => artist.id);
		const nonRockIndices = [];


		for(let i = 0; i < trackArtists.length; i++) {
			// Check if the artist's rock status was already stored in Redis
			const rockCheck = await client.hGet("artistbyId", trackArtists[i]);
			if(rockCheck && rockCheck !== "true") {
				nonRockIndices.push(i);
				continue;
			};	// If the artist is not rock, skip to the next artist

			// Otherwise, get the artist and check if they are rock
			try {
				const curArtist = await getArtistById(trackArtists[i]);

				// Call functions to retrieve the rest of the Artist's data
				// But do not wait, since this function is not dependent on their execution/return values
				getArtistTopTracksById(trackArtists[i]);
				getArtistAlbumsById(trackArtists[i]);
				getArtistDescription(trackArtists[i], curArtist.name);

				isRock = true;
				await client.hSet("artistById", trackArtists[i], "true");	// Set the artist's rock status to true
				await client.set(`artist.${curArtist.id}`, JSON.stringify(curArtist));
			} catch (e) {
				nonRockIndices.push(i);
				await client.hSet("artistById", trackArtists[i], "false");	// Set the artist's rock status to false
			}
		}

		if(!isRock) throw new Error("Track is not a rock track!");
		getAlbumById(track.album.id);	// Call function to store the album in Redis
		track.artists = track.artists.filter((track, index) => !nonRockIndices.includes(index));

		await client.hSet("trackById", id, isRock.toString());
		await client.set(`track.${id}`, JSON.stringify(track));
		return track;
		
	}
}

/**
 * 
 * @param {string} id 
 * @param {string} artistName 
 * @param {string} trackName 
 * @returns {string} song lyrics
 */
async function getTrackLyrics(id, artistName, trackName) { 

	id = checkString(id);
	artistName = checkString(artistName);
	trackName = checkString(trackName);
	trackName = trackName.replace(/[^a-zA-Z0-9 ]/g, '');
	trackName = trackName.split('feat')[0];
	const exists = await client.exists(`track.${id}.lyrics`);
	
	if(exists) {
		const lyrics = await client.get(`track.${id}.lyrics`);
		return lyrics;
	} else {
		const lyrics = await lyricsParse(trackName, artistName);
		await client.set(`track.${id}.lyrics`, lyrics || "none");
		return lyrics || "none";
	}
}

module.exports ={
	getArtistById,
	getAlbumById,
	getTrackById,
	getArtistTopTracksById,
	getArtistAlbumsById,
	getTrackLyrics,
	getArtistDescription
}