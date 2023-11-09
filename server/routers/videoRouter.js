const express = require('express');
const videos = require('../controllers/videoController');

//create the router
const router = express.Router();

router.get('/:id', videos.getVideos, (req, res) => {
  return res.status(200).json(res.locals.videos);
});

router.post('/update', videos.updateVideo, (req, res) => {
  return res.sendStatus(200);
});

router.post('/add', videos.updateVideo, videos.addVideo, (req, res) => {
  return res.status(200);
});

router.delete('/delete', videos.deleteVideos, (req, res) => {
  return res.status(200).send('deleted');
});
//exporting the router
module.exports = router;
