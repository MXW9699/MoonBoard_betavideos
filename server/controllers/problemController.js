const db = require('../../model/database.js');

const holdset = [];

module.exports = {
  //get problems
  getList: (req, res, next) => {
    let search = req.params.id ? req.params.id : '';
    db.from('Problems')
      .select('*')
      .ilike('name', `%${search}%`)
      .order('name', { ascending: true })
      .then((data) => {
        //an array of objects
        res.locals.problemsList = data.data;
        return next();
      })
      .catch(() => {
        return next({ log: 'error at getting problems list' });
      });
  },

  //get holds
  updateHolds: async (req, res, next) => {
    // const { name, holdsets } = req.body;
    for (let i = 0; i < holdset.length; i++) {
      await db
        .from('Problems')
        .update({ holds: holdset[i] })
        .eq('id', i + 214);
    }
    return next();
  },
};
