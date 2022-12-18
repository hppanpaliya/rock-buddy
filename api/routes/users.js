const express = require("express");
const router = express.Router();

const gm = require('gm');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage: storage}).single('file');


router.post('/profilepic', upload, async (req, res) => { 
	res.set('Content-Type', 'image/jpeg');
	// res.set('Content-Type', 'arraybuffer');
	try { 
		return(
			// gm(req.file.buffer)
			// 	.resize(500, 500)
			// 	.compress('JPEG')
			// 	.sharpen(10, 1.25)
			// 	.setFormat('JPEG')
			// 	.stream()
			// 	.pipe(res)
				gm(req.file.buffer)
				.resize(500, 500, '<')  // Resize the image to fit within a 500x500 area while maintaining the aspect ratio
				.background('#000000')  // Set the background color to black
				.gravity('Center')  // Set the gravity of the image to the center
				.extent(500, 500)  // Fill the empty space with the background color
				.compress('JPEG')
				.quality(80)
				.sharpen(10, 1.25)
				.setFormat('JPEG')
				.stream()
				.pipe(res)
		);
	} catch (e) { 
		console.log(e);
		return res.status(500).json({error: e});
	}
});



// router.post('/:userId/profilepic', async (req, res) => {
// 	req.body.userId = checkString(req.params.userId);
// 	upload(req, res, (err) => { 
// 		if(err) { 
// 			return res.status(400).json({error: err});
// 		}
// 		console.log(req.file);
// 	})

// 		gm(req.file)
// 			.resize(300, 300)
// 			.compress('JPEG')
// 			.stream()
// 			.pipe(res);
// 		return res.send(res);
// });

module.exports = router;

