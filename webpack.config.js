const prod = process.argv[4];
console.log(prod, process.argv);
if (prod === 'development') {
  module.exports = require('./webpack.developer');
} else {
  module.exports = require('./webpack.production');
}
