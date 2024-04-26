const db = require('../../model/database.js');

const verifiedUsers = {
  Mitch: 'Wen',
  Hello: 'World',
};

const users = {
  verifyUser: (req, res, next) => {
    //deconstruct the username and password from the request body
    const { username, password } = req.body;
    if (verifiedUsers[username]) {
      if (verifiedUsers[username] === password) return next();
    } else {
      return next({
        log: 'verifyUser error',
        status: 400,
        message: { err: 'you are not real' },
      });
    }
  },

  addUser: (req, res, next) => {
    console.log(db.from);
    db.from('Users')
      .insert([{ username: 'tryna', firstName: 'hello', lastName: 'world' }])
      .select()
      .then((data) => {
        console.log('data:', data);
        return next();
      })
      .catch(() => {
        return next({ log: 'error adding' });
      });
  },
};

module.exports = users;
