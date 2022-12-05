const express = require("express");
const router = express.Router();

const helper = require('../helper')
const { checkString } = helper.validations;
const data = require('../data');
const { default: axios } = require("axios");
const info = data.info;

router.get('/:type(artist|album|track)/:id', async (req, res, next) => { 
	try { 
		req.params.id = checkString(req.params.id);
	} catch (e) { 
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
		return res.json({foundArtist: foundArtist, foundArtistTopTracks: foundArtistTopTracks, foundArtistAlbums: foundArtistAlbums});
	} catch (e) {
		console.log(e);
		if(e.response && e.response.status) {
			return res.status(e.response.status).json({error: e});
		}
		return res.status(500).json({error: e});
	}
});

// Sample id: 4aawyAB9vmqN3uQ7FjRGTy
router.get('/album/:id', async (req, res) => {
	try {
		let foundAlbum = await info.getAlbumById(req.params.id);
		return res.json({foundAlbum: foundAlbum});
	} catch (e) {
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
		return res.json({foundTrack: foundTrack});
	} catch (e) {
		if(e.response && e.response.status) {
			return res.status(e.response.status).json({error: e});
		}
		return res.status(500).json({error: e});
	}
});

router.get('/test', async (req, res) => { 
	try { 
		let { data } = await axios.get(
			'http://api.music-story.com/oauth/request_token?oauth_consumer_key=<VOTRE CONSUMER KEY>&oauth_signature=<SIGNATURE OAUTH>'

		)
	} catch(e) { 
		console.log(e);
		res.json({error: e});
	}
});

module.exports = router;