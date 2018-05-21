var env = process.env.NODE_ENV || 'developement';
console.log('env ***', env);

if (env === 'developement' || env === 'test') {
  let config = require('./config.json');
  // console.log(config);
  // uncomment the above and run node ./server/config/config.js to see config
  let envConfig = config[env];

  Object.keys(envConfig).forEach((key) => {
    // console.log(`${key}  = ${envConfig[key]}`);
    // uncomment and run node ./server/config/config.js
    process.env[key] = envConfig[key];
  });
}

// if (env === 'developement') {
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
// }else if (env === 'test') {
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
// }
