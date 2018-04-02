const{ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findOneAndRemove
// Todo.findByIdAndRemove
Todo.findOneAndRemove({_id: '5ac16b46cfde8b8c194b97d6'}).then((todo) => {

});

Todo.findByIdAndRemove('5ac16b46cfde8b8c194b97d6').then((todo) => {
  console.log(todo);
});
