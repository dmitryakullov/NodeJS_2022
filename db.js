const Datastore = require('nedb');

const UsersDb = new Datastore({ filename: './dataBase/users' });
UsersDb.loadDatabase();

const TodoListDb = new Datastore({ filename: './dataBase/todolist' });
TodoListDb.loadDatabase();

// Hardcode User
const HARDCODED_USER_EMAIL = 'cat@dog.com';
// const HARDCODED_USER_PASSWORD = '1234_Asdf';
const HARDCODED_USER_PASSWORD_HASH = '$2b$11$dd61NsfDbgfzp87DoHaXDeoOx1147d1Xy6pWtush104CEbQQGp.DW';
const HARDCODED_JWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhdEBkb2cuY29tIiwiZmlyc3ROYW1lIjoiIiwibGFzdE5hbWUiOiIiLCJfaWQiOiJYaDgwR2FIclpxT0p2NDQ2IiwiaWF0IjoxNjU5OTY4NzIzfQ.ubPUsFgTSFtCpDJIR71_f0QbSaQrc2CpjSEeG_aTu9Y';

UsersDb.findOne({ email: HARDCODED_USER_EMAIL }, (err, user) => {
  if (err) console.log(err);
  if (!err && user) {
    console.log({ HARDCODED_JWT });
  }
  if (!err && !user) {
    UsersDb.insert(
      {
        email: HARDCODED_USER_EMAIL,
        password: HARDCODED_USER_PASSWORD_HASH,
        firstName: '',
        lastName: '',
        _id: 'Xh80GaHrZqOJv446',
      },
      (insertErr, newUser) => {
        if (insertErr) console.log(insertErr);
        if (!insertErr && newUser) {
          console.log({ HARDCODED_JWT });
        }
      },
    );
  }
});

module.exports = {
  UsersDb,
  TodoListDb,
};
