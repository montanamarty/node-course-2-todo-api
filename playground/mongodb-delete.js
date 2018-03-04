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

// deleteMany
// db.collection('Users').deleteMany({name: 'Anders'}).then((result) => {
//   console.log(result);
// });

// deleteOne
// db.collection('Todos').deleteOne({text: 'Eat Lunch'}).then((result) => {
//   console.log(result.deletedCount);
// });

// findOneAndDelete
db.collection('Users').findOneAndDelete({_id: new ObjectID("5a91fd98d7dca41f7803ade3")}).then((result) => {
  console.log(JSON.stringify(result.value, undefined, 2));
});
// using ObjectID -- new ObjectID("5a91fe458bc30104a439b8c0") to get
// this is the destructured variable from above so ObjectID must be the same
// as the variable used here:
// const {MongoClient, ObjectID} = require('mongodb');

  // db.close();
});
