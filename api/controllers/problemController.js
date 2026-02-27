const db = require('../../model/database.js');

const holdset = [];

module.exports = {
  //get problems
  getList: (req, res, next) => {
    const search = req.params.id ?? '';

    db.getProblemsList(search)
      .then((data) => {
        res.locals.problemsList = data.data;
        return next();
      })
      .catch(() => {
        return next({ log: 'error at getting problems list' });
      });
  },

  //get holds
  updateHolds: async (req, res, next) => {
    for (let i = 0; i < holdset.length; i++) {
      await db.updateHolds(i + 214, holdset[i]);
    }
    return next();
  },
};
