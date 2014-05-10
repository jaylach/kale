var pkg = require('./package.json');

module.exports = require('./lib/kale');
module.exports.version = pkg.version;