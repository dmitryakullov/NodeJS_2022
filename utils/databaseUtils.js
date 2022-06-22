const bcrypt = require('bcrypt');
const { UsersDb } = require('../db');

async function signupHandler(email, password, done) {
  const hash = await bcrypt.hash(password, 10);

  UsersDb.findOne({ email, password: hash }, (err, user) => {
    if (err) {
      return done(null, false, { message: 'An error occurred!' });
    }
    if (user) {
      return done(null, false, { message: 'This user has already exist!' });
    }

    UsersDb.insert({ email, password: hash }, (err, newUser) => {
      if (err || !newUser) {
        return done(err);
      }

      return done(null, newUser);
    });
  });
}

async function loginHandler(email, password, done) {
  const hash = await bcrypt.hash(password, 10);

  UsersDb.findOne({ email, password: hash }, (err, user) => {
    if (err || !user) {
      return done(null, false, { message: 'Wrong Email or Password' });
    }

    return done(null, user, { message: 'Logged in Successfully' });
  });
}

module.exports = {
  signupHandler,
  loginHandler,
};
