const db = require('../../model/database.js');

module.exports = {
  //get problems
  getVideos: (req, res, next) => {
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

  updateVideo: (req, res, next) => {
    const { link, problemName } = req.body;
    if (!(link && problemName)) {
      return next({ message: { err: 'empty fields' } });
    }
    console.log('updating');
    db.from('Videos')
      .update({ link: link.replace('/p/', '/reel/') + 'embed' })
      .eq('problemName', problemName.toUpperCase())
      .eq('uploaded_by', 1)
      .then((data) => {
        console.log(data);
        return next();
      })
      .catch(() => {
        return next({ log: 'error at updating video' });
      });
  },

  addVideo: (req, res, next) => {
    const { username, link, problemName } = req.body;
    if (!(username && link && problemName)) {
      return next({ message: { err: 'empty fields' } });
    }
    const newLink = link.replace('/p/', '/reel/') + 'embed';
    db.from('Videos')
      .insert([
        {
          uploaded_by: username,
          problemName: problemName.toUpperCase(),
          link: newLink,
        },
      ])
      .select()
      .then((data) => {
        console.log(data);
        return next();
      })
      .catch(() => {
        return next({ log: 'error at upadating video' });
      });
  },

  deleteVideos: (req, res, next) => {
    const { username, link, problemName } = req.body;
    // db.from('Videos')
    //   .select('*')
    //   .eq('problemName', problemName)
    //   .eq('uploaded_by', username)
    //   .then((data) => {
    //     console.log(data);
    //     return next();
    //   });
    db.from('Videos')
      .delete()
      .eq('problemName', problemName)
      .eq('uploaded_by', username)
      .then((data) => {
        console.log(data);
        return next();
      })
      .catch(() => {
        return next({ log: 'error in getting videos' });
      });
  },
};
