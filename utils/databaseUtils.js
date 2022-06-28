const bcrypt = require('bcrypt');
const { saltRounds } = require('../constants/salt');
const { UsersDb } = require('../db');

async function signupHandler(email, password, done) {
  UsersDb.findOne({ email }, (err, user) => {
    if (err) {
      return done(null, false, { message: 'An error occurred!' });
    }
    if (user) {
      return done(null, false, { message: 'This user has already exist!' });
    }

    bcrypt.hash(password, saltRounds, (bcryptErr, hash) => {
      if (bcryptErr) {
        return done(bcryptErr);
      }

      UsersDb.insert({ email, password: hash, firstName: '', lastName: '' }, (err, newUser) => {
        if (err || !newUser) {
          return done(err);
        }

        return done(null, newUser);
      });
    });
  });
}

async function loginHandler(email, password, done) {
  UsersDb.findOne({ email }, (err, user) => {
    if (err || !user) {
      return done(null, false, { message: 'Wrong Email or Password' });
    }
    bcrypt.compare(password, user.password, function (bcryptErr, isPasswordMatch) {
      if (bcryptErr || !isPasswordMatch) {
        return done(null, false, { message: 'Wrong Email or Password' });
      }

      return done(null, user, { message: 'Logged in Successfully' });
    });
  });
}

module.exports = {
  signupHandler,
  loginHandler,
};
