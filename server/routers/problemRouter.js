const express = require('express');
const problems = require('../controllers/problemController');

//create the router
const router = express.Router();

router.get('/:id', problems.getList, (req, res) => {
  return res.status(200).json(res.locals.problemsList);
});

router.get('/', problems.getList, (req, res) => {
  return res.status(200).json(res.locals.problemsList);
});

// router.post('/update', videos.updateVideo, (req, res) => {
//   return res.sendStatus(200);
// });

// router.post('/add', videos.updateVideo, videos.addVideo, (req, res) => {
//   return res.status(200);
// });

// router.delete('/delete', videos.deleteVideos, (req, res) => {
//   return res.status(200).send('deleted');
// });
//exporting the router
module.exports = router;
