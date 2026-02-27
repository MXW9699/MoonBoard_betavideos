const { getVideoSource } = require('../../Serverless/scraper.js');
const db = require('../../model/database.js');

module.exports = {
  //get problems
  getVideosByName: (req, res, next) => {
    console.log('getting videos', req.params.id);
    db.getVideosByName(req.params.id)
      .then((data) => {
        res.locals.videos = data.data;
        return next();
      })
      .catch(() => {
        return next({ log: 'error in getting videos' });
      });
  },

  getVideosByUser: (req, res, next) => {
    console.log('getting videos of user', req.params.id);
    db.getVideosByUser(req.params.id)
      .then((data) => {
        res.locals.videos = data.data;
        return next();
      })
      .catch(() => {
        return next({ log: 'error in getting videos' });
      });
  },

  updateVideo: async (req, res, next) => {
    const { username, link, problemName } = req.body;
    if (!(username && link && problemName)) {
      return next({ message: { err: 'empty fields' } });
    }
    console.log(link);
    const modifiedLink =
      link.replace('/p/', '/reel/') + ((link.slice(-6) != '/embed')
        ? 'embed'
        : '');
    console.log(modifiedLink);
    const videoSource = await getVideoSource(modifiedLink);

    console.log('updating');
    db.updateVideo(problemName, username, {
      link: modifiedLink,
      video: videoSource.video,
      img: videoSource.img,
    })
      .then(() => {
        return next();
      })
      .catch(() => {
        return next({ log: 'error at updating video' });
      });
  },

  addVideo: async (req, res, next) => {
    let { username, link, problemName } = req.body;
    if (username == 'DYNA.MITCH') username = '1';
    if (!(username && link && problemName)) {
      return next({ message: { err: 'empty fields' } });
    }
    const modifiedLink =
      link.replace('/p/', '/reel/') + ((link.slice(-6) != '/embed')
        ? 'embed'
        : '');
    const videoSource = await getVideoSource(modifiedLink);
    db.addVideo({
      uploaded_by: username,
      problemName: problemName.toUpperCase(),
      link: modifiedLink,
      video: videoSource.video,
      img: videoSource.img,
    })
      .then((data) => {
        console.log(data);
        return next();
      })
      .catch(() => {
        return next({ log: 'error at adding video' });
      });
  },

  deleteVideos: (req, res, next) => {
    console.log('STARTING TO DELETE');
    const { problemName } = req.body;
    db.deleteVideos(problemName, 1)
      .then((data) => {
        console.log(data);
        return next();
      })
      .catch(() => {
        return next({ log: 'error in deleting video' });
      });
  },
};
