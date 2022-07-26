const Datastore = require('nedb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { saltRounds, JWT_SALT } = require('./constants/salt');

const UsersDb = new Datastore({ filename: './dataBase/users' });
UsersDb.loadDatabase();

const TodoListDb = new Datastore({ filename: './dataBase/todolist' });
TodoListDb.loadDatabase();

// Hardcode User
const HARDCODED_USER_EMAIL = 'cat@dog.com';
const HARDCODED_USER_PASSWORD = '1234_Asdf';

const logJwt = (user) => {
  delete user.password;
  console.log({ HARDCODED_JWT: jwt.sign(user, JWT_SALT) });
};

UsersDb.findOne({ email: HARDCODED_USER_EMAIL }, (err, user) => {
  if (!err && user) {
    logJwt(user);
  }
  if (!err && !user) {
    bcrypt.hash(HARDCODED_USER_PASSWORD, saltRounds, (bcryptErr, hash) => {
      if (bcryptErr) {
        return;
      }

      UsersDb.insert(
        { email: HARDCODED_USER_EMAIL, password: hash, firstName: '', lastName: '' },
        (insertErr, newUser) => {
          if (!insertErr && newUser) {
            logJwt(newUser);
          }
        },
      );
    });
  }
});

module.exports = {
  UsersDb,
  TodoListDb,
};
