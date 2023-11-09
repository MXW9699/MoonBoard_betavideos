const db = require('../../model/database.js');

module.exports = {
  //get problems
  getList: (req, res, next) => {
    db.from('Problems')
      .select('*')
      .then((data) => {
        res.locals.problemsList = data.data;
        return next();
      })
      .catch(() => {
        return next({ log: 'error at getting problems list' });
      });
  },

  //get holds
  getHolds: (req, res, next) => {},
};
