const axios = require('axios')
const SpotifyWebApi = require('spotify-web-api-node');
const helper = require('../helper');
const { SPOTIFY_API_BASE_URL } = helper.constants;
const { checkString } = helper.validations;

/**
 * Gets an artist given an id
 * 
 * @param {string} id
 * 
 * @returns {object} artist
 */
async function getArtistById(id) { 

	id = checkString(id);
	
	const response = await axios.get(`${SPOTIFY_API_BASE_URL}/artists/${id}`,
		{
			headers: { 'Authorization': `Bearer ${process.env.AUTH_TOKEN}` }
		}
	);
	return response.data;
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
	
	const response = await axios.get(`${SPOTIFY_API_BASE_URL}/albums/${id}`,
		{
			headers: { 'Authorization': `Bearer ${process.env.AUTH_TOKEN}` }
		}
	);
	return response.data;
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
	
	const response = await axios.get(`${SPOTIFY_API_BASE_URL}/tracks/${id}`,
		{
			headers: { 'Authorization': `Bearer ${process.env.AUTH_TOKEN}` }
		}
	);
	return response.data;
}

async function getArtistTopTracksById(id) { 
	id = checkString(id);
	
	const response = await axios.get(`${SPOTIFY_API_BASE_URL}/artists/${id}/top-tracks?country=US`,
		{
			headers: { 'Authorization': `Bearer ${process.env.AUTH_TOKEN}` }
		}
	);
	return response.data;

}

async function getArtistAlbumsById(id) { 
	id = checkString(id);
	
	const response = await axios.get(`${SPOTIFY_API_BASE_URL}/artists/${id}/albums`,
		{
			headers: { 'Authorization': `Bearer ${process.env.AUTH_TOKEN}` }

		}
	);
	return response.data;
}

module.exports ={
	getArtistById,
	getAlbumById,
	getTrackById,
	getArtistTopTracksById,
	getArtistAlbumsById
}