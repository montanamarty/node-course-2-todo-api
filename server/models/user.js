const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

let UserSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{value} is not a valid email'
    }
    // this isn't required, call validator.isEmail directly
    // validate: {
    //   validator: (value) => {
    //     return validator.isEmail(value);
    //   },
    //   message: '{value} is not a valid email'
    // }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
}

// UserSchema.methods is an object
// on this object we can add any methods we want
// these will be instance methods
// instance methods have access to the individual document
// which we need to create the JWT
// but this must not be arrow frunction because we need this keyword
// to access the individual document
UserSchema.methods.generateAuthToken = function () {
  let user = this;
  let access = 'auth';
  let token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens = user.tokens.concat([{access, token}]);

  return user.save().then(() => {
    return token;
  });
};

// UserSchema.static is an object like .methods
// but everything you add on to it turns into a model method
// as opposed to an instance method
UserSchema.statics.findByToken = function (token) {
  // User as opposed to user,
  // instance methods get called with individual document
  // model methods get called with the model as the this binding
  let User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    // return new Promise((resolve, reject) => {
    //   reject();
    // })
    // a simpler way then creating a promise then rejecting is:
    return Promise.reject();
    // and arguement could be returned .reject('test')
    // that value would get used back in catch as the (e) variable
    // back in server.js, .catch((e) => {res.status(401).send();
  };

  return User.findOne({
    '_id': decoded._id,
    // quotes are required if you have a . in the value
    // like below for nested objects
    // the quotes above for _id, are not required, they're for consistency
    'tokens.token': token,
    'tokens.access': 'auth'

  });
};

var User = mongoose.model('User', UserSchema);

module.exports = {User};
