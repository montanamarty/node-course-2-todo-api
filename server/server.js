require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const{ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {Todo} = require('./models/todo');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text,
    // completed: req.body.completed
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

// app.get /todos :id
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }
    res.send({todo});
    // the todo array is ES6 notation same as res.send({todo: todo})
  }).catch((e) => {
    res.status(400).send();
  });
});

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }
    res.send({todo});
    }).catch((e) => {
    res.status(400).send();
  });
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});

// POST /users
// app.post('/todos', (req, res) => {
//   var todo = new Todo({
//     text: req.body.text,
//     // completed: req.body.completed
//   });
//
//   todo.save().then((doc) => {
//     res.send(doc);
//   }, (e) => {
//     res.status(400).send(e);
//   });
// });
// var body = _.pick(req.body, ['text', 'completed']);

// POST /users
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password'])
  // var user = new User({
  //   email: body.email,
  //   password: body.password
  // don't need to pass the object, everyting is already in body
  // });
  var user = new User(body);
  user.save().then(() => {
    return user.generateAuthToken();
    //res.send(user);
  }).then((token) => {
    // this is sent as a http header
    // res.header() takes 2 variables key:value
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});


// this will set up express middleware to authenticate the users
// let authenticate = (req, res, next) => {
//   let token = req.header('x-auth');
//
//   User.findByToken(token).then((user) => {
//     if (!user) {
//       // this could return the same res.status(401).send()
//       // but can also reject the promis, like in user.js
//       // then the .catch((e)) function will be called
//       // which sends res.status(401).send() anyway
//       return Promise.reject();
//     }
//
//     req.user = user;
//     req.token = token;
//     next();
//   }).catch((e) => {
//     res.status(401).send();
//   });
// };

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

// app.get('/users/me', (req, res) => {
//   let token = req.header('x-auth');
//
//   User.findByToken(token).then((user) =>{
//     if (!user) {
//       return Promis.reject();
//     }
//     res.send(user)
//   }).catch((e) => {
//     res.status(401).send();
//   });
// });

// POST /users/login {email, password}
app.post('/users/login', (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    })
  }).catch((e) => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};

// var otherTodo = new Todo({
//   text: '    Edit this video      ',
//   // completed: true,
//   // completedAt: 1521840532
// })
//
// otherTodo.save().then((doc) => {
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//   console.log('Unable to save', e);1
// });

// var newUser = new User({
//   email: '   Adam@workaholic.me     '
// });
//
// newUser.save().then((doc) => {
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//   console.log('Unable to save', e);
// });
