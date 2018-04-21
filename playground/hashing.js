const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = '123abc!';

// bcrypt.genSalt(10, (errr, salt) => {
//   bcrypt.hash(password, salt, (error, hash) => {
//     console.log(hash);
//   });
// });

var hashedPassword = '$2a$10$zq.h4mpzUOOpsp0ZuxBI7ex4x/Dw/jU3J0Hziqai/vuY8.y/pY4Ba'

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});

// let data = {
//   _id: '5ad8f84ae60b509023acd393',
//   access: 'auth'
// };
//
// let token = jwt.sign(data, 'abc123');
// console.log(token);
//
// let decoded = jwt.verify(token, 'abc123');
// console.log('decoded', decoded);


// This is an example of how JWT works --- sort of

// let message = 'I am user number 3';
// let hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
// let data = {
//   id: 4
// }
//
// let token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
// console.log(JSON.stringify(token.data));
// let resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// // this will simulate MITM changes
// // token.data.id = 5
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// console.log(JSON.stringify(token.data));
//
// if (resultHash === token.hash) {
//   console.log('Data was not changed')
// } else {
//   console.log('Data was changed. Do not trust!')
// }
