var fs = require('fs');

var parser = require('./lib/parser').parser;
parser.yy = require('./lib/nodes');

fs.readFile('./examples/simple.jav', 'UTF8', function(err, data) {
  if ( err == null ) {
    var result = parser.parse(data);
    console.log(result.formatJSON({}));
    //console.log(JSON.stringify(result));
  }
});