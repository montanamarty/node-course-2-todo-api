const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

let data = {
  _id: '5ad8f84ae60b509023acd393',
  access: 'auth'
};

let token = jwt.sign(data, 'abc123');
console.log(token);

let decoded = jwt.verify(token, 'abc123');
console.log('decoded', decoded);


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
