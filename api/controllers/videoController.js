const { getVideoSource } = require('../../Serverless/scraper.js');
const db = require('../../model/database.js');

module.exports = {
  //get problems
  getVideosByName: (req, res, next) => {
    console.log('getting videos', req.params.id);
    db.from('Videos')
      .select('*')
      .eq('problemName', req.params.id)
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
    db.from('Videos')
      .select('*, Problems_2019(grade)')
      .eq('uploaded_by', req.params.id * 1)
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
    db.from('Videos')
      .update({
        link: modifiedLink,
        video: videoSource.video,
        img: videoSource.img,
      })
      .eq('problemName', problemName.toUpperCase())
      .eq('uploaded_by', username)
      .then((data) => {
        // console.log(data);
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
    db.from('Videos')
      .insert([
        {
          uploaded_by: username,
          problemName: problemName.toUpperCase(),
          link: modifiedLink,
          video: videoSource.video,
          img: videoSource.img,
        },
      ])
      .select()
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
    db.from('Videos')
      .delete()
      .eq('problemName', problemName)
      .eq('uploaded_by', 1)
      .then((data) => {
        console.log(data);
        return next();
      })
      .catch(() => {
        return next({ log: 'error in deleting video' });
      });
  },
};
