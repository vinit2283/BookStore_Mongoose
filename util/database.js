const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect('mongodb+srv://vinitaperions:1HvP8D4pDQYRSgWx@cluster0.x6fng.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(client => {
      console.log('Connected to MongoDB');
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    })
};
const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found !';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;