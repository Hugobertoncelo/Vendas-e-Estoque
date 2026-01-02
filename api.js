let handler = require('./backend/dist/src/index.js');
if (handler && handler.default) handler = handler.default;
module.exports = handler;
