let {User} = require('./../models/user');

// this will set up express middleware to authenticate the users
let authenticate = (req, res, next) => {
  let token = req.header('x-auth');

  User.findByToken(token).then((user) => {
    if (!user) {
      // this could return the same res.status(401).send()
      // but can also reject the promis, like in user.js
      // then the .catch((e)) function will be called
      // which sends res.status(401).send() anyway
      return Promise.reject();
    }

    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send();
  });
};

module.exports = {authenticate};
