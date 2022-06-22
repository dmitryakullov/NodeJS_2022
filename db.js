const Datastore = require('nedb');

const UsersDb = new Datastore({ filename: './dataBase/users' });

UsersDb.loadDatabase();

module.exports = {
  UsersDb,
};
