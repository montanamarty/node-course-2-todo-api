// const MongoClient = require('mongodb').MongoClient;
// use destructuring to create the MongoClient variable above from mongodb
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID;
console.log(obj);

// destructuring - create a variable from a field in an object see below:
// var user = {name: 'Anders', age: 29};
// var {name} = user;
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

// findOneAndUpdate
db.collection('Todos').findOneAndUpdate({
  _id: new ObjectID('5a9b48fe105b3a1c9f6f2674')
}, {
  $set: {
    completed: false
  }
}, {
  returnOriginal: false
}).then((result) => {
  console.log(result);
});

db.collection('Users').findOneAndUpdate({
  _id: new ObjectID('5a91fd39514a951404074ce8')
}, {
  $set: {
    name: 'Anders'
  },
  $inc: {
    age: 1
  }
}, {
  returnOriginal: false
}).then((result) => {
  console.log(result);
});

  // db.close();
});
