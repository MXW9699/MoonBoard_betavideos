const express = require('express');
const videos = require('../controllers/videoController');

//create the router
const router = express.Router();

router.get('/user/:id', videos.getVideosByUser, (req, res) => {
  return res.status(200).json(res.locals.videos);
});

router.get('/:id', videos.getVideosByName, (req, res) => {
  return res.status(200).json(res.locals.videos);
});


router.post('/update', videos.updateVideo, (req, res) => {
  return res.sendStatus(200);
});

router.post('/add', videos.updateVideo, videos.addVideo, (req, res) => {
  return res.status(200);
});

router.post('/delete', videos.deleteVideos, (req, res) => {
  return res.redirect('/data');
});
//exporting the router
module.exports = router;
