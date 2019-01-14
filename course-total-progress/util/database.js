const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect('mongodb+srv://ariel:12131415@cluster0-4a0ak.mongodb.net/test?retryWrites=true')
  .then(client => {
    _db = client.db();
    console.log('Connected!');
    callback();
  })
  .catch(err => {
    console.log(err)
    throw err;
  });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
