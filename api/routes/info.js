const express = require("express");
const router = express.Router();

const helper = require('../helper')
const { checkString } = helper.validations;
const data = require('../data');
const info = data.info;

const axios = require('axios');

router.get('/:type(artist|album|track)/:id', async (req, res, next) => { 
	try { 
		req.params.id = checkString(req.params.id);
	} catch (e) { 
		console.log(e);
		return res.status(400).json({error: e});
	}
	next();
});

// Sample id: 0TnOYISbd1XYRBk9myaseg
router.get('/artist/:id', async (req, res) => {
	try {
		const foundArtist = await info.getArtistById(req.params.id);
		const foundArtistTopTracks = await info.getArtistTopTracksById(req.params.id);
		const foundArtistAlbums = await info.getArtistAlbumsById(req.params.id);
		const foundArtistDescription = await info.getArtistDescription(req.params.id, foundArtist.name);
		return res.json(
			{
				foundArtist: foundArtist, 
				foundArtistTopTracks: foundArtistTopTracks, 
				foundArtistAlbums: foundArtistAlbums,
				foundArtistDescription: foundArtistDescription
			}
		);
	} catch (e) {
		console.log(typeof e, e);
		if(e.response && e.response.status) {
			return res.status(e.response.status).json({error: e});
		}
		return res.status(500).json({error: e.message || e});
	}
});

// Sample id: 4aawyAB9vmqN3uQ7FjRGTy
router.get('/album/:id', async (req, res) => {
	try {
		let foundAlbum = await info.getAlbumById(req.params.id);
		return res.json({foundAlbum: foundAlbum});
	} catch (e) {
		console.log(e);
		if(e.response && e.response.status) {
			return res.status(e.response.status).json({error: e});
		}
		return res.status(500).json({error: e});
	}
});

// Sample id: 11dFghVXANMlKmJXsNCbNl
router.get('/track/:id', async (req, res) => {
	try {
		let foundTrack = await info.getTrackById(req.params.id);
		let foundLyrics = await info.getTrackLyrics(req.params.id, foundTrack.artists[0].name, foundTrack.name)

		return res.json({foundTrack: foundTrack, foundLyrics: foundLyrics});
	} catch (e) {
		console.log(e);
		if(e.response && e.response.status) {
			return res.status(e.response.status).json({error: e});
		}
		return res.status(500).json({error: e});
	}
});

router.get('/test/:songTitle', async (req, res) => { 
	try { 
		const response = await axios.get(`https://api.genius.com/search/lyrics=${req.params.songTitle}`,
			{ 
				headers: { 'Authorization': `Bearer ${process.env.GENIUS_ACCESS_TOKEN}` }
		 	}
		)
		return res.json(response.data);
	} catch(e) { 
		console.log(e);
		return res.json({error: e});
	}
});

module.exports = router;