// const MongoClient = require('mongodb').MongoClient;
// use destructuring to create the MongoClient variable above from mongodb
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID;
// console.log(obj);

// destructuring - create a variable from a field in an object see below:
// var user = {name: 'Anders', age: 29};
// var {name} = user;
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').insertOne({
  //   text: 'something to do',
  //   completed: false
  // }, (err, result) => {
  //   if(err) {
  //     return console.log('Unable to insert Todo', err);
  //   }
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });


  // db.collection('Users').insertOne({
  //   name: 'Anders',
  //   age: 99,
  //   location: 'workaholics'
  // }, (err, result) => {
  //   if(err) {
  //     return console.log('Unable to insert User', err);
  //   }
  //   console.log(result.ops[0]._id.getTimestamp());
  // });
  db.close();
});
