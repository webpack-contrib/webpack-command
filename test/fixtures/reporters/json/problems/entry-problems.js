// warning
console.log(require); // eslint-disable-line

// error
if (!window) { require('test'); } // eslint-disable-line

require('./image.jpg');
