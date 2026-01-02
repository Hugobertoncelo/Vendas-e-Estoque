let handler = require('./index.js');
if (handler && handler.default) handler = handler.default;
module.exports = handler;
