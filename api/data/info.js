const axios = require('axios')
const SpotifyWebApi = require('spotify-web-api-node');
const helper = require('../helper');
const { SPOTIFY_API_BASE_URL } = helper.constants;
const { checkString } = helper.validations;

const redis = require('redis');
const client = redis.createClient();
client.connect().then(() => {});

/**
 * Gets an artist given an id
 * 
 * @param {string} id
 * 
 * @returns {object} artist
 */
async function getArtistById(id) { 
	id = checkString(id);

	const exists = await client.exists(`artist.${id}`);
	
	if(exists) {
		const artist = await client.get(`artist.${id}`);
		return JSON.parse(artist);
	} else {
		const response = await axios.get(`${SPOTIFY_API_BASE_URL}/artists/${id}`,
			{
				headers: { 'Authorization': `Bearer ${process.env.AUTH_TOKEN}` }
			}
		);
		const artist = response.data;
		await client.set(`artist.${id}`, JSON.stringify(artist));
		return artist;
	}
}

/**
 * Gets an album given an id
 * 
 * @param {string} id
 * 
 * @returns {object} album
 */
async function getAlbumById(id) { 
	
	id = checkString(id);
	
	const exists = await client.exists(`album.${id}`);

	if(exists) {
		const album = await client.get(`album.${id}`);
		return JSON.parse(album);
	} else {
		const response = await axios.get(`${SPOTIFY_API_BASE_URL}/albums/${id}`,
			{
				headers: { 'Authorization': `Bearer ${process.env.AUTH_TOKEN}` }
			}
		);
		const album = response.data;
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
		const response = await axios.get(`${SPOTIFY_API_BASE_URL}/tracks/${id}`,
			{
				headers: { 'Authorization': `Bearer ${process.env.AUTH_TOKEN}` }
			}
		);
		const track = response.data;
		await client.set(`track.${id}`, JSON.stringify(track));
		return track;
	}
}

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
		await client.set(`artist.${id}.topTracks`, JSON.stringify(topTracks));
		return response.data;
	}


}

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
		const seenNames = [];
		response.data.items = response.data.items.filter((album) => {
			if(seenNames.includes(album.name.toLowerCase())){
				return false;
			}
				
			seenNames.push(album.name.toLowerCase());
			return true;
		});
		const albums = response.data;
		await client.set(`artist.${id}.albums`, JSON.stringify(albums));
		return albums;
	}
}

module.exports ={
	getArtistById,
	getAlbumById,
	getTrackById,
	getArtistTopTracksById,
	getArtistAlbumsById
}